import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from './ui/button';

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

    const cardElement = elements!.getElement(CardElement);
    const { error, token } = await stripe!.createToken(cardElement!);
    console.log('token', token);

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[Stripe Token]', token);
      onTokenReceived(token.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div className="flex items-center justify-center mt-10">
      <Button onClick={handleSubmit} className="w-[100px] bg-[#1565C0] hover:bg-[#1565C0]/90 md:w-[200px] xl:w-[300px]">
        Pay

      </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
