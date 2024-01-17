// import { NGOProps } from "@/utils/types/ngoProps";
// import NGOCard from "./NGOCard";
// import { getAllFavoriteNGOs, getAllNGOs } from "@/apis/ngoApi";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// <<<<<<< HEAD
// import { FavoriteNgoProps } from "@/utils/types/favoriteNgoProps";
// import { UserService } from "@/apis/profile/UserService";
// import { User } from "@/utils/types";
// =======
// import { useSearch } from "./providers/SearchProvider";
// >>>>>>> dev
//
// const CardsSection = () => {
//   // const navigate = useNavigate();
//   const [ngos, setNgos] = useState<NGOProps[]>([]);
// <<<<<<< HEAD
//   const [currentUserID, setCurrentUserID] = useState<User>();
//   const [favorites, setFavorites] = useState<FavoriteNgoProps[]>([]);
// =======
//   const { searchValue } = useSearch();
//   const [filteredNgos, setFilteredNgos] = useState<NGOProps[]>([]);
// >>>>>>> dev
//
//   useEffect(() => {
//     (async () => {
//       const allNgos = await getAllNGOs();
//       setNgos(allNgos);
//     })();
//   }, []);
//
//   useEffect(() => {
// <<<<<<< HEAD
//     loadUserInfo();
//   }, []);
//
//   const loadUserInfo = async () => {
//     await UserService.getCurrentUser()
//         .then((user)=> {
//           setCurrentUserID(user);
//         });
//   };
//
//   useEffect(() => {
//     (async () => {
//       const favoriteNGOs = await getAllFavoriteNGOs(Number(currentUserID?.id));
//       setFavorites(favoriteNGOs);
//     })();
//   }, [currentUserID]);
//
//   const onVolunteerClick = () => {
// =======
//     const result = ngos.filter((ngo) =>
//       ngo.name.toLowerCase().includes(searchValue.toLowerCase()),
//     );
//     setFilteredNgos(result);
//   }, [ngos, searchValue]);
//
//   const onContactClick = () => {
// >>>>>>> dev
//     navigate("/volunteer");
//   };
//
//   const onDonateClick = () => {
//     navigate("/donate");
//   }
//
//   return (
// <<<<<<< HEAD
//     <div className="items-center lg:max-w-[715px] 2xl:max-w-[1069px]">
//       <div className="flex flex-wrap">
//         {ngos.map((ngo, index) =>
//         {
//           // Check if the ngoid exists in the favorites list
//           const isFavorite = favorites.some(
//             (favorite) => favorite.idNgo === ngo.id
//           );
//
//           return (
//             <div key={index} className="m-2">
//               <NGOCard
//                 ngo={ngo}
//                 marginTop={
//                   index === 0 || index === 1 || index === 2 ? "mt-0" : "mt-5"
//                 }
//                 currentUserId={Number(currentUserID?.id)}
//                 isFavorite={isFavorite}
//                 onDonateClick={onVolunteerClick}
//                 onVolunteerClick={onVolunteerClick}
//               />
//             </div>
//           );
//               })}
//       </div>
// =======
//     <div className="flex flex-wrap justify-center px-2 pt-5">
//       {filteredNgos.map((ngo, index) => (
//         <div key={index} className="m-2">
//           <NGOCard
//             ngo={ngo}
//             onDonateClick={onDonateClick}
//             onContactClick={onContactClick}
//           />
//         </div>
//       ))}
// >>>>>>> dev
//     </div>
//   );
// };
//
// export default CardsSection;
