import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

interface CreateSubscriptionBody {
  priceId: string;
  freeTrial?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { priceId, freeTrial }: CreateSubscriptionBody = body;

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    let sessionId;
    if (freeTrial) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: priceId, // Use the price ID for the product with a subscription
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 7, // Set the trial period to 7 days
        },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      });
      sessionId = session.id;
      console.log("FREE TRAIL CUSTOMER", session);
    } else {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      });
      sessionId = session.id;
      console.log("PAID CUSTOMER", session);
    }

    return NextResponse.json({ id: sessionId }, { status: 200 });
  } catch (error: any) {
    console.error("Stripe error:", error.message);
    return NextResponse.json(
      { statusCode: 500, message: error.message },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
