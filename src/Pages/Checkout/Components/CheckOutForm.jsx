import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import "../../CartCard/Style/style.css";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
    });

    if (error) console.log(error.message);

    setIsLoading(false);
  };
  return (
    <form
      className="w-full  flex flex-col gap-4  items-center p-8"
      onSubmit={handleSubmit}
    >
      <PaymentElement className="w-full" />
      <button
        className="bg-green-800 w-full rounded-md p-2 px-4 text-white"
        disabled={isLoading}
      >
        {isLoading ? "processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckOutForm;
