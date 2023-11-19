import { NGOProps } from "@/utils/types/ngoProps";
import NGOCard from "./NGOCard";
import { getAllNGOs } from "@/apis/ngoApi";
import { useEffect, useState } from "react";

const CardsSection = () => {
  const [ngos, setNgos] = useState<NGOProps[]>([]);
  useEffect(() => {
    (async () => {
      setNgos(await getAllNGOs("admin", "admin", 10));
    })();
  }, [ngos]);
  return (
    <div className="lg:max-w-[715px] 2xl:max-w-[1069px] items-center">
    <div className="flex flex-wrap">
      {ngos.map((ngo, index) => (
        <div key={index} className="m-2 ">
          <NGOCard
            ngoName={ngo.name}
            ngoURL={ngo.website}
            ngoContact={ngo.contact}
            marginTop={
              index === 0 || index === 1 || index === 2 ? "mt-0" : "mt-5"
            }
            onDonateClick={() => {}}
            onVolunteerClick={() => {}}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default CardsSection;
