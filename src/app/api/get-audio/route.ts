import { NextResponse, NextRequest } from "next/server";
import { DeepgramError, createClient } from "@deepgram/sdk";
import fs from "fs";

const handler: any = async (req: NextRequest) => {
  try {
    console.time("audioGenerationTime"); // Start the timer

    // Parse the incoming JSON body
    const { text }: any = await req.json();

    if (!text || text === "") {
      return NextResponse.json(
        { status: false, message: "Failed. Text is required." },
        { status: 400 }
      );
    }

    // gotta use the request object to invalidate the cache every request :vomit:
    const url = req.url;
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY ?? "");

    const { result: projectsResult, error: projectsError } =
      await deepgram.manage.getProjects();

    if (projectsError) {
      return NextResponse.json(projectsError);
    }

    const project = projectsResult?.projects[0];

    if (!project) {
      return NextResponse.json(
        new DeepgramError(
          "Cannot find a Deepgram project. Please create a project first."
        )
      );
    }

    const response = await deepgram.speak.request(
      { text },
      {
        model: "aura-luna-en",
        encoding: "linear16",
        container: "wav",
      }
    );

    const stream = await response.getStream();
    if (stream) {
      const buffer = await getAudioBuffer(stream);
      console.timeEnd("audioGenerationTime"); // End the timer and log the time taken
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
        },
      });
    } else {
      console.error("Error generating audio:", stream);
      return NextResponse.json({
        status: false,
        message: "Failed to generate audio",
      });
    }
  } catch (error) {
    console.log("[TEXT TO SPEECH ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
};

const getAudioBuffer = async (response: any) => {
  const reader = response.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};

export const POST = handler;
