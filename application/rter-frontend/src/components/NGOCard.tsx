import * as React from "react";
import { Gift, LucideHeart, PlusSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { NGOProps } from "@/utils/types/ngoProps";
import { addNgoToFavorites, removeNgoFromFavorites } from "@/apis/ngoApi";
import { FavoriteNgoProps } from "@/utils/types/favoriteNgoProps";

interface NGOCardProps {
  ngo: NGOProps;
  marginTop: string;
  isFavorite: boolean; // Pass the favorite status as a prop
  currentUserId: number;
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

const NGOCard: React.FC<NGOCardProps> = ({
  ngo,
  marginTop,
  currentUserId,
  onDonateClick,
  onVolunteerClick,
  isFavorite,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isFavoriteNGO, setIsFavoriteNGO] = useState<boolean>(isFavorite);

  const handleFavoriteClick = async () => {
    const favoriteNgoData: FavoriteNgoProps = {
      idNgo: ngo.id,
      idUser: currentUserId,
    };

    try {
      if (isFavoriteNGO) {
        // If it's already a favorite, remove it
        await removeNgoFromFavorites(favoriteNgoData);
      } else {
        // If it's not a favorite, add it
        await addNgoToFavorites("admin", "admin",favoriteNgoData);
        console.log("Added to favorites");
      }
      // Toggle the favorite status
      setIsFavoriteNGO(!isFavoriteNGO);
    } catch (error) {
      // Handle errors
      console.error("Error toggling favorite status", error);
    }
  };

  return (
    <>
      <Card className={`m-5 ${marginTop} h-[400px] w-[300px]`}>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle
              className={
                "hover:text-cyan-500 line-clamp-2 cursor-pointer items-center justify-between overflow-hidden text-lg transition-colors"
              }
              onClick={(): void => setIsDialogOpen(true)}
            >
              {ngo.name}
            </CardTitle>
            <Button
              onClick={handleFavoriteClick}
              style={{ background: "transparent" }}
            >
              {isFavoriteNGO ? (
                <LucideHeart size={20} style={{ color: "red" }} />
              ) : (
                <LucideHeart size={20} style={{ color: "black" }} />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 ">
          <div className="flex items-center justify-center h-[200px]">
            <img
              src={ngo.imageUrl}
              alt={`${ngo.name} Logo`}
              className="ml-auto mr-auto max-h-[200px] max-w-[200px] rounded-lg"
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button onClick={onDonateClick}>
            <Gift size={20} />
            <span className="ml-2">Donate</span>
          </Button>
          <Button onClick={onVolunteerClick}>
            <PlusSquare size={20} />
            <span className="ml-2">Volunteer</span>
          </Button>
        </CardFooter>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(): void => setIsDialogOpen(!isDialogOpen)}
      >
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ngo.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="flex">
              <img
                src={ngo.imageUrl}
                alt={`${ngo.name} Logo`}
                className="ml-auto mr-auto max-h-[200px] max-w-[200px] rounded-lg"
              />
              <div className="mb-10 ml-5 mt-2 flex flex-col justify-between">
                <span className="">{ngo.contact}</span>
                <a
                  href={ngo.website}
                  className="hover:text-sky-800 text-lg hover:underline"
                >
                  Visit their website
                </a>
              </div>
            </div>
          </DialogDescription>

          <DialogFooter>
            <Button onClick={onDonateClick}>
              <Gift size={20} />
              <span className="ml-2">Donate</span>
            </Button>
            <Button onClick={onVolunteerClick}>
              <PlusSquare size={20} />
              <span className="ml-2">Volunteer</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NGOCard;