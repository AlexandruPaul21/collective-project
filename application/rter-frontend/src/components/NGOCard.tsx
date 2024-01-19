import * as React from "react";
import { Gift, LucideHeart, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import "../utils/style/heart-animation.css";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { NGOProps } from "@/utils/types/ngoProps";
import Map from "./Map";
import { fromAddress, setKey, setLanguage, setRegion } from "react-geocode";
import { GOOGLE_MAPS_API_KEY } from "@/utils/consts";
import { addNgoToFavorites, removeNgoFromFavorites } from "@/apis/ngoApi";
import { FavoriteNgoProps } from "@/utils/types/favoriteNgoProps";
import { COLORS, User } from "@/utils/types";
import { useNavigate } from "react-router";

interface NGOCardProps {
  ngo: NGOProps;
  isFavorite?: boolean;
  currentUser?: User;
  onFavoriteChange?: () => void;
}

const styles = {
  donateButton: {
    backgroundColor: COLORS.DEEP_BLUE,
    color: COLORS.WHITE,
  },
  contactButton: {
    backgroundColor: COLORS.TEAL,
    color: COLORS.WHITE,
  },
  noContactText: {
    fontSize: "12px",
    color: COLORS.RED,
  },
};

const NGOCard: React.FC<NGOCardProps> = ({
  ngo,
  isFavorite,
  currentUser,
  onFavoriteChange,
}) => {
  const navigate = useNavigate();
  const isContactDisabled = ngo.email === "null";
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onContactClick = () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    navigate("/volunteer/"+ngo.id +"/"+ngo.email);
  };
  const onDonateClick = () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }
    const emailFlag = ngo.email === "null" ? "0" : "1";
    navigate("/donate/" + ngo.id + "/" + emailFlag);
  };

  const handleFavoriteClick = async () => {
    if (!currentUser) {
      navigate("/sign-in");
      return;
    }

    const favoriteNgoData: FavoriteNgoProps = {
      idNgo: ngo.id,
      idUser: Number(currentUser?.id!),
    };

    try {
      if (isFavorite) {
        // If it's already a favorite, remove it
        await removeNgoFromFavorites(
          currentUser.username,
          currentUser.password,
          favoriteNgoData,
        );
        console.log("Removed from favorites" + favoriteNgoData);
      } else {
        // If it's not a favorite, add it
        await addNgoToFavorites(
          currentUser.username,
          currentUser.password,
          favoriteNgoData,
        );
        console.log("Added to favorites" + favoriteNgoData);
      }
      if (onFavoriteChange) {
        onFavoriteChange();
      }
      // Toggle the favorite status
    } catch (error) {
      // Handle errors
      console.error("Error toggling favorite status", error);
    }
  };

  // Grabbing the latitude and longitude from the ngo address
  const [lat, setLat] = useState("0");
  const [lng, setLng] = useState("0");
  const [isLoaded, setIsLoaded] = useState(false);

  // Setting the Google Maps API key information
  setKey(GOOGLE_MAPS_API_KEY);
  setLanguage("en");
  setRegion("ro");

  // Searching for the address
  useEffect(() => {
    const fetchData = async () => {
      await fromAddress(ngo.address)
        .then(({ results }: { results: any[] }) => {
          setLat(results[0].geometry.location.lat);
          setLng(results[0].geometry.location.lng);
          setIsLoaded(true);
        })
        .catch(console.error);
    };
    fetchData();
  }, []);

  return (
    <>
      <Card className={`h-[400px] w-[300px]`}>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle
              className={
                "hover:text-cyan-500 line-clamp-2 h-[56px] cursor-pointer items-center justify-between overflow-hidden text-lg transition-colors"
              }
              onClick={(): void => setIsDialogOpen(true)}
            >
              {ngo.name}
            </CardTitle>
            <Button
              onClick={handleFavoriteClick}
              style={{ background: "transparent" }}
            >
              {isFavorite ? (
                <LucideHeart
                  size={20}
                  className="heartAnimation"
                  style={{ color: "red" }}
                />
              ) : (
                <LucideHeart size={20} style={{ color: "black" }} />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 ">
          <div className="flex h-[200px] items-center justify-center">
            <img
              src={ngo.imageUrl}
              alt={`${ngo.name} Logo`}
              className="ml-auto mr-auto max-h-[200px] max-w-[200px] rounded-lg"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-center space-x-4 md:flex-row">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={onDonateClick} style={styles.donateButton}>
                    <Gift className="h-4 w-4" />
                    <span className="font-sm ml-2">Donate</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">Donate to this NGO</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={onContactClick}
                    style={styles.contactButton}
                    disabled={isContactDisabled}
                  >
                    <Phone className="h-4 w-4" />
                    <span className="font-sm ml-2">Contact Us</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">
                    {isContactDisabled
                      ? "No contact information available"
                      : "Contact us for more information"}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(): void => setIsDialogOpen(!isDialogOpen)}
      >
        <DialogOverlay />
        <DialogContent className="min-h-[400px] max-w-[350px] rounded-lg md:max-w-[700px]">
          <DialogHeader className="py-4">
            <DialogTitle>{ngo.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={ngo.imageUrl}
                alt={`${ngo.name} Logo`}
                className="hidden max-h-[200px] max-w-[200px] items-center justify-center rounded-lg md:flex"
              />
              <div className="mb-10 ml-5 mt-2 flex flex-col items-center justify-between md:items-start">
                {!ngo.contact.includes("null") ? (
                  <span className="overflow-hidden text-center md:text-start">
                    {ngo.contact}
                  </span>
                ) : (
                  <span>No contact information provided</span>
                )}

                <span>Address : {ngo.address}</span>

                {isLoaded ? <Map lat={lat} lng={lng} /> : <></>}

                <a
                  href={ngo.website}
                  className="text-lg hover:text-[#4e85c4] hover:underline"
                >
                  Visit their website
                </a>
              </div>
            </div>
          </DialogDescription>

          <DialogFooter className="flex justify-center space-x-4 md:items-center md:justify-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={onDonateClick} style={styles.donateButton}>
                    <Gift size={20} />
                    <span className="ml-2">Donate</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">Donate to this NGO</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={onContactClick}
                    style={styles.contactButton}
                    disabled={isContactDisabled}
                    className="w-[130px]"
                  >
                    <Phone size={20} />
                    <span className="ml-2">Contact Us</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">
                    {isContactDisabled
                      ? "No contact information available"
                      : "Contact us for more information"}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NGOCard;
