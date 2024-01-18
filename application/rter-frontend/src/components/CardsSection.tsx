import { NGOProps } from "@/utils/types/ngoProps";
import NGOCard from "./NGOCard";
import { getAllFavoriteNGOs, getAllNGOs } from "@/apis/ngoApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "@/apis/profile/UserService";
import { User } from "@/utils/types";
import { useSearch } from "./providers/SearchProvider";

const CardsSection = () => {
  const [ngos, setNgos] = useState<NGOProps[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [favorites, setFavorites] = useState<NGOProps[]>([]);
  const { searchValue } = useSearch();
  const [filteredNgos, setFilteredNgos] = useState<NGOProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const allNgos = await getAllNGOs();
      setNgos(allNgos);
    })();
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    await UserService.getCurrentUser().then((user) => {
      setCurrentUser(user);
      console.log(user);
    });
  };

  useEffect(() => {
    if (currentUser) {
      loadFavoriteNGOs();
    }
  }, [currentUser]);

  const loadFavoriteNGOs = async () => {
    if (currentUser?.username && currentUser.password && currentUser.id) {
      const favoriteNGOs = await getAllFavoriteNGOs(
        currentUser.username,
        currentUser.password,
        Number(currentUser.id),
      );
      setFavorites(favoriteNGOs);
    }
  };

  useEffect(() => {
    const result = ngos.filter((ngo) =>
      ngo.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredNgos(result);
  }, [ngos, searchValue]);
  const updateFavorites = (ngo: NGOProps, isFavorite: boolean) => {
    if (isFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, ngo]);
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== ngo.id),
      );
    }
  };

  return (
    <div className="items-center lg:max-w-[715px] 2xl:max-w-[1069px]">
      <div className="flex flex-wrap">
        {filteredNgos.map((ngo, index) => (
          <div key={index} className="m-2">
            <NGOCard
              ngo={ngo}
              isFavorite={favorites.some((favorite) => favorite.id === ngo.id)}
              currentUser={currentUser!}
              onFavoriteChange={() =>
                updateFavorites(
                  ngo,
                  !favorites.some((favorite) => favorite.id === ngo.id),
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsSection;
