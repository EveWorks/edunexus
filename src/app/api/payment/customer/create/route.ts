import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-12-18.acacia",
    });
    const body = await req.json(); // Parse the JSON body
    const { email, name } = body;

    const customer = await stripe.customers.create({
      email,
      name,
    });

    // Optional but recommended
    // Save the customer object or ID to your database

    return NextResponse.json({ status: true, data: customer }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { status: false, message: e.message },
      { status: 500 }
    );
  }
}
