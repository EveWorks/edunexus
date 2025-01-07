import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import axios from "@/axios";

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
    const { id, userId }: CreateSubscriptionBody = body;

    if (!id) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(id);

    if (session) {
      const customer = await stripe.customers.retrieve(
        session.customer as string
      );

      if (customer) {
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
        });

        if (subscriptions) {
          const subscription = subscriptions.data[0];

          const payload = {
            userId,
            stripeCustomerId: customer.id,
            subscriptionId: subscription.id,
            stripeSessionId: id,
            subscriptionType:
              subscription?.status === "trialing" ? "FREE" : "PAID",
          };

          const response = await axios.post("/users/subscribe-plan", payload);

          return NextResponse.json(
            {
              status: true,
              data: response.data,
              message: "Subscription created",
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { status: false, message: "No subscriptions found" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { status: false, message: "No customer found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: false, message: "Invalid session id provided" },
      { status: 400 }
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
