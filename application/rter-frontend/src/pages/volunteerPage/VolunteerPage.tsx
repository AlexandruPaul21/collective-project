import Navbar from "@/components/Navbar";
import VolunteerForm from "@/components/VolunteerForm";

const VolunteerPage = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-[100vh]">
        <VolunteerForm />
      </div>
    </div>
  );
};

export default VolunteerPage;
