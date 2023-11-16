import CardsSection from "@/components/CardsSection";
import FilterSidebar from "@/components/FilterSidebar";
import Navbar from "@/components/Navbar";
const MainPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <div className="flex flex-row justify">
        <FilterSidebar/>
        <CardsSection/>
      </div>
</div>
  );
};

export default MainPage;
