import { getAllFavoriteNGOs } from "@/apis/ngoApi";
import { UserService } from "@/apis/profile/UserService";
import { NGOProps } from "@/utils/types/ngoProps";
import { useState, useEffect } from "react";
import NGOCard from "./NGOCard";
import { User } from "@/utils/types";


const FavoriteCards = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [favorites, setFavorites] = useState<NGOProps[]>([]);

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

  const handleFavoriteChange = () => {
    fetchFavoriteNGOs();
  };

  return (
    <div className="flex flex-wrap justify-center px-2 pt-5">
        {favorites.map((ngo, index) => (
          <div key={index} className="m-2">
            <NGOCard
              ngo={ngo}
              isFavorite={true}
              currentUser={currentUser!}
              onFavoriteChange={handleFavoriteChange}
            />
          </div>
        ))}
    </div>
  );
};

export default FavoriteCards;
