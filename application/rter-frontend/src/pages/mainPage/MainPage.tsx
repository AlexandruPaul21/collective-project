import CardsSection from "@/components/CardsSection";
import NavbarWithSearch from "@/components/NavbarWithSearch";

const MainPage = () => {
  return (
    <div className="flex flex-col">
      <NavbarWithSearch />
      <div className="mt-10 flex justify-center gap-7">
        <CardsSection />
      </div>
    </div>
  );
};

export default MainPage;
