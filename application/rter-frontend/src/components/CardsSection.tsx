import { NGOProps } from "@/utils/types/ngoProps";
import NGOCard from "./NGOCard";
import { getAllNGOs } from "@/apis/ngoApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./providers/SearchProvider";

const CardsSection = () => {
  const navigate = useNavigate();
  const [ngos, setNgos] = useState<NGOProps[]>([]);
  const { searchValue } = useSearch();
  const [filteredNgos, setFilteredNgos] = useState<NGOProps[]>([]);

  useEffect(() => {
    (async () => {
      const allNgos = await getAllNGOs();
      setNgos(allNgos);
    })();
  }, []);

  useEffect(() => {
    const result = ngos.filter((ngo) =>
      ngo.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredNgos(result);
  }, [ngos, searchValue]);

  const onContactClick = () => {
    navigate("/volunteer");
  };

  const onDonateClick = () => {
    navigate("/donate");
  }

  return (
    <div className="flex flex-wrap justify-center px-2 pt-5">
      {filteredNgos.map((ngo, index) => (
        <div key={index} className="m-2">
          <NGOCard
            ngo={ngo}
            onDonateClick={onDonateClick}
            onContactClick={onContactClick}
          />
        </div>
      ))}
    </div>
  );
};

export default CardsSection;
