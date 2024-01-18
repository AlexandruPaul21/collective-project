import DonateItemsForm from "@/components/DonateItemsForm";
import Navbar from "@/components/Navbar";
import Background from "../../../../public/donation-background.svg";
const DonateItems = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div
        className="h-[calc(100vh-80px)]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <DonateItemsForm />
      </div>
    </div>
  );
};

export default DonateItems;
