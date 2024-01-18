import Navbar from "@/components/Navbar";
import VolunteerForm from "@/components/VolunteerForm";
import Background from "../../../public/background2.svg";
const VolunteerPage = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-[calc(100vh-80px)]" style={{ backgroundImage: `url(${Background})` }}>
        <VolunteerForm />
      </div>
    </div>
  );
};

export default VolunteerPage;
