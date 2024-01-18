import { getAllFavoriteNGOs } from "@/apis/ngoApi";
import { UserService } from "@/apis/profile/UserService";
import { NGOProps } from "@/utils/types/ngoProps";
import { useState, useEffect } from "react";
import NGOCard from "./NGOCard";
import { User } from "@/utils/types";
import { useNavigate } from "react-router";


const FavoriteCards = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [favorites, setFavorites] = useState<NGOProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    await UserService.getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        console.log(user);
      });
  };

  const fetchFavoriteNGOs = async () => {
    const favoriteNGOs = await getAllFavoriteNGOs(currentUser!.username, currentUser!.password, Number(currentUser!.id));
    setFavorites(favoriteNGOs);
  };

  useEffect(() => {
    if (currentUser && currentUser.username && currentUser.password && currentUser.id) {
      fetchFavoriteNGOs();
    }
  }, [currentUser]);

  const onContactClick = () => {
    navigate("/volunteer");
  };

  const onDonateClick = () => {
    navigate("/donate");
  }

  const handleFavoriteChange = () => {
    fetchFavoriteNGOs();
  };

  return (
    <div className="items-center lg:max-w-[715px] 2xl:max-w-[1069px]">
      <div className="flex flex-wrap">
        {favorites.map((ngo, index) => (
          <div key={index} className="m-2">
            <NGOCard
              ngo={ngo}
              isFavorite={true}
              currentUser={currentUser!}
              onDonateClick={onDonateClick}
              onContactClick={onContactClick}
              onFavoriteChange={handleFavoriteChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteCards;
