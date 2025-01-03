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
    const { email, name } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
    });

    // Optional but recommended
    // Save the customer object or ID to your database

    res.status(200).json({
      code: "customer_created",
      customer,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      code: "customer_creation_failed",
      error: e,
    });
  }
}
