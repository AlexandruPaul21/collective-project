import * as React from "react";
import { Gift, LucideHeart, PlusSquare } from "lucide-react";
import { Button } from "./ui/button";
import { NGOProps } from "@/utils/types/ngoProps";
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
  NGO: NGOProps;
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

const NGOCard: React.FC<NGOCardProps> = ({
  //the NGO card should receive through props an NGO object after it is implemented
  NGO,
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
      <Card className="m-5 flex h-[350px] w-[320px] flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="pt- cursor-pointer items-center justify-between transition-colors hover:text-cyan-500"
              onClick={(): void => setIsDialogOpen(true)}
            >
              {NGO.name}
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
        <CardContent className="grid max-h-20 gap-4 overflow-hidden overflow-ellipsis">
          <CardDescription>{NGO.contact}</CardDescription>
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between">
          <Button
            onClick={onDonateClick}
            className="bg-red-500"
            style={{ backgroundColor: "#ED254A" }}
          >
            <Gift size={20} />
            <span className="ml-2">Donate</span>
          </Button>
          <Button
            onClick={onVolunteerClick}
            style={{ backgroundColor: "#39D0D1" }}
            className="bg-teal-400"
          >
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
            <DialogTitle>{NGO.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{NGO.contact}</DialogDescription>

          <DialogFooter>
            <Button
              onClick={onDonateClick}
              style={{ backgroundColor: "#ED254A" }}
              className="bg-red-500"
            >
              <Gift size={20} />
              <span className="ml-2">Donate</span>
            </Button>
            <Button
              onClick={onVolunteerClick}
              style={{ backgroundColor: "#39D0D1" }}
              className="bg-teal-400"
            >
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
