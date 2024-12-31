import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2024-12-18.acacia",
    });
    const { subscriptionId } = req.body;

    const deletedSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );

    res.status(200).json({
      code: "subscription_deleted",
      deletedSubscription,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      code: "subscription_deletion_failed",
      error: e,
    });
  }
}
