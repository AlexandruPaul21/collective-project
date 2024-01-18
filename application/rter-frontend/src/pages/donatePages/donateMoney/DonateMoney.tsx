import Navbar from "@/components/Navbar"
import PaymentForm from "@/components/PaymentForm";
import { NGOProps } from "@/utils/types/ngoProps";
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51OZGIJBvOG8Oe6QO2aZKsfA7hpP0UAaZWsXFiSXltRkA3rtFon1YoGzAGYcry8MSJPqqLGWpEJVNUpNS0tGUGZey00O6EsT87h");

const DonateMoney = () => {
const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe', 
      variables: {
        colorPrimary: '#1305e1'
      }
    }
  };

  return (
    <div> app 
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
    </div>
  );
}

export default DonateMoney