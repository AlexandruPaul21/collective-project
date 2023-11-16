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
  CardDescription,
  CardFooter,
} from "./ui/card";
import { DialogHeader, DialogFooter } from "./ui/dialog";

interface NGOCardProps {
  ngoName: string;
  ngoPhoto: string;
  ngoDescription: string;
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

const NGOCard: React.FC<NGOCardProps> = ({
  //the NGO card should receive through props an NGO object after it it implemented
  ngoName,
  ngoPhoto,
  ngoDescription,
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
      <Card className="m-5 w-[300px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="pt- cursor-pointer items-center justify-between transition-colors hover:text-cyan-500"
              onClick={(): void => setIsDialogOpen(true)}
            >
              {ngoName}
            </CardTitle>{" "}
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
        <CardContent className="grid gap-4">
          <img
            src={ngoPhoto}
            alt={`${ngoName} Logo`}
            style={{ borderRadius: "10px" }}
          />
          <CardDescription>{ngoDescription}</CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button onClick={onDonateClick} className="bg-red-500">
            <Gift size={20} />
            <span className="ml-2">Donate</span>
          </Button>
          <Button onClick={onVolunteerClick} className="bg-teal-400">
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
            <DialogTitle>{ngoName}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <span className="m-4 flex">
              <img
                src={ngoPhoto}
                alt={`${ngoName} Logo`}
                style={{
                  borderRadius: "10px",
                  maxWidth: "200px",
                  maxHeight: "200px",
                }}
              />
              Location <br />
              Contact <br />
              Website <br />
              Social Media <br />
              Cause <br />
            </span>
            {ngoDescription}
          </DialogDescription>

          <DialogFooter>
            <Button onClick={onDonateClick} className="bg-red-500">
              <Gift size={20} />
              <span className="ml-2">Donate</span>
            </Button>
            <Button onClick={onVolunteerClick} className="bg-teal-400">
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
