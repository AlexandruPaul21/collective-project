import { NGOProps} from "@/utils/types/ngoProps";
import { ScrollArea } from "./ui/scroll-area";
import NGOCard from "./NGOCard";
import {getAllNGOs} from "@/apis/ngoApi";
import {useEffect, useState} from "react";

const CardsSection = () => {
    const [ngos , setNgos] = useState<NGOProps[]>([])
    useEffect(()=>{(async ()=>{
        setNgos(await getAllNGOs("admin", "admin", 10));
    })()}, [ngos]);
   return (
      <ScrollArea className="max-h-[93vh] w-full">

        <div className="flex flex-wrap ">
          {ngos.map((ngo, index) => (
              <div key={index} className="m-2 ">
                <NGOCard
                    ngoName={ngo.name}
                    ngoPhoto={''}
                    ngoDescription={ngo.website}
                    onDonateClick={()=>{}}
                    onVolunteerClick={()=>{}}
                />
              </div>
          ))}
        </div>
      </ScrollArea>
  );
};

export default CardsSection;