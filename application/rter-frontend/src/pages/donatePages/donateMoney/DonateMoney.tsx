
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";
import Background from "../../../../public/donation-background.svg";
const DonateMoney = () => {

  return (
    <div className="h-screen">
      <Navbar />
      <div
        className="h-[calc(100vh-80px)]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <PaymentForm />
      </div>
    </div>
  );
};


export default DonateMoney;
