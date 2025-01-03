import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-12-18.acacia",
    });
    const body = await req.json(); // Parse the JSON body
    const { subscriptionId } = body;

    const deletedSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );

    return NextResponse.json(
      { status: true, data: deletedSubscription },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { status: false, message: e.message },
      { status: 500 }
    );
  }
}
