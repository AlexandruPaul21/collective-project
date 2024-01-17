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
import { NGOProps } from "@/utils/types/ngoProps";
import { COLORS } from "@/utils/types";

interface NGOCardProps {
  ngo: NGOProps;
  onDonateClick: () => void;
  onContactClick: () => void;
}

const styles = {
  donateButton: {
    backgroundColor: COLORS.DEEP_BLUE,
    color: COLORS.WHITE
  },
  contactButton: {
    backgroundColor: COLORS.TEAL,
    color: COLORS.WHITE
  },
  noContactText: {
    fontSize: "12px",
    color: COLORS.RED
  }
};

const NGOCard: React.FC<NGOCardProps> = ({
  ngo,
  onDonateClick,
  onContactClick,
}) => {
  const isContactDisabled = ngo.email === "null";
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
              {ngo.name}
            </CardTitle>
            <Button
              onClick={handleAddFavouriteClick}
              style={{ background: "transparent" }}
            >
              <LucideHeart
                size={20}
                style={{ color: isFavourite ? COLORS.RED : COLORS.BLACK }}
              />
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
        <CardFooter className="flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between space-x-4">
            <Button
              onClick={onDonateClick}
              style={styles.donateButton}
            >
              <Gift size={20} />
              <span className="ml-2">Donate</span>
            </Button>
            <Button
              onClick={onContactClick}
              style={styles.contactButton}
              disabled={isContactDisabled}
            >
              <Phone size={20} />
              <span className="ml-2">Contact</span>
            </Button>
          </div>
          {ngo.email === "null" ? (
            <div className="self-end">
              <span style={styles.noContactText}>*No contact available</span>
            </div>
          ) : null}
        </CardFooter>

      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(): void => setIsDialogOpen(!isDialogOpen)}
      >
        <DialogOverlay />
        <DialogContent className="min-h-[400px] max-w-[700px]">
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
                {!ngo.contact.includes("null") ? (
                  <span className="overflow-hidden">{ngo.contact}</span>
                ) : (
                  <span>No contact information provided</span>
                )}
                <a
                  href={ngo.website}
                  className="hover:text-sky-800 text-lg hover:underline"
                >
                  Visit their website
                </a>
              </div>
            </div>
          </DialogDescription>


          <DialogFooter className="flex flex-col">
            <div className="flex md:flex-row items-center justify-center space-x-4">
              <Button onClick={onDonateClick} style={styles.donateButton}>
                <Gift size={20} />
                <span className="ml-2">Donate</span>
              </Button>
              <Button onClick={onContactClick} style={styles.contactButton} disabled={isContactDisabled}>
                <Phone size={20} />
                <span className="ml-2">Contact Us</span>
              </Button>
            </div>
          </DialogFooter>
          {ngo.email === "null" ? (
            <div className="flex justify-end self-end right " style={{ marginTop: '-70px' }}>
              <span style={styles.noContactText}>*No contact available</span>
            </div>
          ) : <div> </div>}

        </DialogContent>
      </Dialog>
    </>
  );
};

export default NGOCard;
