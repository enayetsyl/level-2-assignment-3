import Stripe from "stripe";

const stripe = new Stripe(
  `sk_test_51OHOq1BYRJK6WPifzi250TFTZJYoU22DPNrhMLgZvhgVluNZW8QFDldyGhsXjzgfhSFPmabi6yOhzWRMTdUDw7lr00KUbCdX91`,
  {
    apiVersion: "2024-06-20",
  }
);

const payment = async (
  amount: number,
  currency: string,
  roomId: string,
  slotId: string,
  userId: string
) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  const clientSecret = paymentIntent.client_secret;
  console.log(clientSecret);
  return clientSecret;
};

const confirmPayment = async (paymentIntentId: string) => {
  console.log("paymentIntentId", paymentIntentId);
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  return paymentIntent;
};

export const PaymentServices = {
  payment,
  confirmPayment,
};
