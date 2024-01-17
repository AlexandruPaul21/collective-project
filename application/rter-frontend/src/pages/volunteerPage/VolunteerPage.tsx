import Navbar from "@/components/Navbar";
import VolunteerForm from "@/components/VolunteerForm";

const VolunteerPage = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-[calc(100vh-80px)]">
        <VolunteerForm />
      </div>
    </div>
  );
};

export default VolunteerPage;
