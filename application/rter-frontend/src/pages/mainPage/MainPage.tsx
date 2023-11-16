import FilterSidebar from "@/components/FilterSidebar";
import NGOCard from "@/components/NGOCard";
import Navbar from "@/components/Navbar";
const MainPage = () => {
  return (
    <div>
      <FilterSidebar />
      <Navbar />
      <NGOCard
        ngoName="Sample NGO"
        ngoPhoto="https://yt3.googleusercontent.com/c1FW9KnEPqDdWqNw5RR9geZwt479yXfSaBXJkPgII93jOfJBaMDQTZ5nJ1fU9N4qJD2t08qlhw=s900-c-k-c0x00ffffff-no-rj"
        ngoDescription="This is a sample NGO descriptionThis is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description.This is a sample NGO description."
        onDonateClick={() => console.log("Donate clicked")}
        onVolunteerClick={() => console.log("Volunteer clicked")}
      />
    </div>
  );
};

export default MainPage;
