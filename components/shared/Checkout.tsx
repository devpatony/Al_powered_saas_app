"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { checkoutCredits } from "@/lib/actions/transaction.action";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    const loadStripeLibrary = async () => {
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      setStripe(stripeInstance);
    };

    loadStripeLibrary();
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast.success("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      toast.error("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  const onCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    try {
      const session = await checkoutCredits(transaction);

      if (stripe && session) {
        const { error } = await stripe.redirectToCheckout({
          
        });

        if (error) {
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error("Failed to create checkout session.");
    }
  };

  return (
    <form onSubmit={onCheckout}>
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;