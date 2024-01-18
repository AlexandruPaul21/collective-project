import React from 'react';
import { useStripe, useElements, CardElement, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { StripePaymentElementOptions } from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px', 
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      }, 
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ onTokenReceived }: { onTokenReceived: (token: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement!);

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[Stripe Token]', token);
      onTokenReceived(token.id);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div className="flex items-center justify-center mt-10">
      <Button type="submit" className="w-[100px] bg-[#01608b] hover:bg-[#01608b]/90 md:w-[200px] xl:w-[300px]" disabled={!stripe}>
        Submit Payment
      </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;