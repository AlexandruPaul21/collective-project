import { NGOProps } from "@/utils/types/ngoProps";
import NGOCard from "./NGOCard";
import { getAllFavoriteNGOs, getAllNGOs } from "@/apis/ngoApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteNgoProps } from "@/utils/types/favoriteNgoProps";
import { UserService } from "@/apis/profile/UserService";
import { User } from "@/utils/types";

const CardsSection = () => {
  const navigate = useNavigate();
  const [ngos, setNgos] = useState<NGOProps[]>([]);
  const [currentUserID, setCurrentUserID] = useState<User>();
  const [favorites, setFavorites] = useState<FavoriteNgoProps[]>([]);

  useEffect(() => {
    (async () => {
      setNgos(await getAllNGOs("admin", "admin"));
    })();
  }, [ngos]);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    await UserService.getCurrentUser()
        .then((user)=> {
          setCurrentUserID(user);
        });
  };

  useEffect(() => {
    (async () => {
      const favoriteNGOs = await getAllFavoriteNGOs(Number(currentUserID?.id));
      setFavorites(favoriteNGOs);
    })();
  }, [currentUserID]);

  const onVolunteerClick = () => {
    navigate("/volunteer");
  };

  return (
    <div className="items-center lg:max-w-[715px] 2xl:max-w-[1069px]">
      <div className="flex flex-wrap">
        {ngos.map((ngo, index) => 
        {
          // Check if the ngoid exists in the favorites list
          const isFavorite = favorites.some(
            (favorite) => favorite.idNgo === ngo.id
          );

          return (
            <div key={index} className="m-2">
              <NGOCard
                ngo={ngo}
                marginTop={
                  index === 0 || index === 1 || index === 2 ? "mt-0" : "mt-5"
                }
                currentUserId={Number(currentUserID?.id)}
                isFavorite={isFavorite}
                onDonateClick={onVolunteerClick}
                onVolunteerClick={onVolunteerClick}
              />
            </div>
          );
              })}
      </div>
    </div>
  );
};

export default CardsSection;
