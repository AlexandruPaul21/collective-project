import * as React from "react";
import { Gift, LucideHeart, Phone } from "lucide-react";
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

interface NGOCardProps {
  ngoName: string;
  ngoURL: string;
  ngoContact: string;
  ngoImage: string;
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

const NGOCard: React.FC<NGOCardProps> = ({
  ngoName,
  ngoURL,
  ngoContact,
  ngoImage,

  onDonateClick,
  onVolunteerClick,
}) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleAddFavouriteClick = (): void => {
    setIsFavourite(!isFavourite);
  };

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
              {ngoName}
            </CardTitle>
            <Button
              onClick={handleAddFavouriteClick}
              style={{ background: "transparent" }}
            >
              <LucideHeart
                size={20}
                style={{ color: isFavourite ? "red" : "black" }}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 ">
          <div className="flex h-[200px] items-center justify-center">
            <img
              src={ngoImage}
              alt={`${ngoName} Logo`}
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
            <Phone size={20} />
            <span className="ml-2">Contact</span>
          </Button>
        </CardFooter>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(): void => setIsDialogOpen(!isDialogOpen)}
      >
        <DialogOverlay />
        <DialogContent className="min-h-[400px] max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{ngoName}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="flex">
              <img
                src={ngoImage}
                alt={`${ngoName} Logo`}
                className="ml-auto mr-auto max-h-[200px] max-w-[200px] rounded-lg"
              />
              <div className="mb-10 ml-5 mt-2 flex flex-col justify-between">
                <span className="overflow-hidden">{ngoContact}</span>
                <a
                  href={ngoURL}
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
              <Phone size={20} />
              <span className="ml-2">Contact Us</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NGOCard;
