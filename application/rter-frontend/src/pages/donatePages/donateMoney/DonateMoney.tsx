import Navbar from "@/components/Navbar"
import PaymentForm from "@/components/PaymentForm";
import { NGOProps } from "@/utils/types/ngoProps";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

interface DonateMoneyProps extends NGOProps {
}

const DonateMoney: React.FC<DonateMoneyProps> = (
  ngo
) => {


  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-[calc(100vh-80px)]">
        <StripeProvider stripe={stripePromise}>
          <PaymentForm
            ngo={ngo} />
        </StripeProvider>

      </div>
    </div>
  );
}

export default DonateMoney