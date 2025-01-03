import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"] as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .send(
        `Webhook Error: ${e instanceof Error ? e.message : "Unknown Error"}`
      );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const subscription = event.data;
      console.log("subscription", subscription);
      break;
    }
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("subscription create", subscription);
      // You can use this to detect changes in the subscription
      // subscription.status will return the current status of the subscription
      //
      // Things you can do here:
      // 1. Send a thank you email to the user
      // 2. Send content you've created that would enhance the user's experience/workflow
      break;
    }

    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      // You can use this to detect changes in the subscription
      // subscription.status will return the current status of the subscription
      //
      // Things you can do here:
      // 1. Send an email to the user notifying them about the change in subscription status
      // 2. If the user cancelled the subscription you could trigger
      // a email campaign to inform users of the beneits they're missing out on.
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log("invoice paid", invoice);
      // If you have trials, this event is triggered when the trial ended and the user was charged for continued access
      // Things you can do:
      // 1. Notify the user of the charge
      // 2. Thank them for their continued belief in your product
      // 3. Send additional content that could enable better workflows for the user
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      // The payment fails or the user does not have a valid payment method
      // The subscription is now past due
      // You can notify the user that the payment has failed
      // and ask them to use different payment methods
      // or revoke their access
      break;
    }

    default: {
      console.error(`Unhandled event type: ${event.type}`);
      break;
    }
  }

  res.status(200);
}
