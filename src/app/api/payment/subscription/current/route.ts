import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import axios from "@/axios";
import { create } from "domain";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

interface CreateSubscriptionBody {
  id: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { id }: CreateSubscriptionBody = body;

    if (!id) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const subscription: any = await stripe.subscriptions.retrieve(id);

    if (subscription) {
      const data = {
        price: subscription.plan.amount,
        currency: subscription.plan.currency,
        type: subscription.status,
        status: subscription.plan.status,
        renewDate: subscription.current_period_end,
        id: subscription.id,
        createdAt: subscription.created,
      };

      return NextResponse.json(
        { status: true, data, message: "Subscription found" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { status: false, message: "No current subscription" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Stripe error:", error.message);
    return NextResponse.json(
      { status: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
