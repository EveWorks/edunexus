import { NextResponse, NextRequest } from "next/server";

const handler: any = async (req: NextRequest) => {
  try {
    const { token, conversationId, userId }: any = await req.json();

    console.log("track close", token, conversationId, userId);

    return NextResponse.json({
      status: true,
      message: "Success",
    });
  } catch (error) {
    console.log("[TEXT TO SPEECH ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
};

export const POST = handler;
