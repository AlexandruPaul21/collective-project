import Navbar from "@/components/Navbar"
import PaymentForm from "@/components/PaymentForm";

const DonateMoney = () => {

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-[calc(100vh-80px)]">
          <PaymentForm />
      </div>
    </div>
  );
}

export default DonateMoney