import CardsSection from "@/components/CardsSection";
import Navbar from "@/components/Navbar";
const MainPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-center gap-7 mt-10">
        <CardsSection />
      </div>
    </div>
  );
};

export default MainPage;
