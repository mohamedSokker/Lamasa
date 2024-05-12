import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CheckOutForm from "../Components/CheckOutForm";

const Checkout = () => {
  const axiosPrivate = useAxiosPrivate();

  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const response = await axiosPrivate("/create-checkout-session", {
          method: "POST",
          data: JSON.stringify({}),
        });
        setClientSecret(response?.data?.clientSecret);
      } catch (err) {
        console.log(err.message);
      }
    };

    getPaymentIntent();
  }, []);

  return (
    <div className="w-full h-screen p-4 flex flex-row gap-4 justify-center items-center m-0">
      {clientSecret && (
        <Elements
          stripe={loadStripe(import.meta.env.VITE_STRIPE_API)}
          options={{ clientSecret }}
        >
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
