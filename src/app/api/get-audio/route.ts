import { NextResponse, NextRequest } from "next/server";

const handler: any = async (req: NextRequest, res: NextResponse) => {
  try {
    const { text }: any = req;

    if (text === "") {
      return NextResponse.json({ messge: "failed" }, { status: 400 });
    }

    return NextResponse.json({ messge: "success" }, { status: 200 });
  } catch (error) {
    console.log("[POST SITE SETTING]", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Handle errors
  }
};

export const POST = handler;
