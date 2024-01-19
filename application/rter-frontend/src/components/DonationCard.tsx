import React from "react";
import { Card, CardTitle, CardContent } from "./ui/card";
import { NGOProps } from "@/utils/types/ngoProps";
import { DonationType } from "@/utils/types";

interface DonationCardProps {
  ngo: NGOProps;
  donationType: DonationType;
  donationDate: Date;
  donationAmount?: number;
}

const DonationCard: React.FC<DonationCardProps> = ({
  ngo,
  donationType,
  donationDate,
  donationAmount,
}) => {
  return (
    <Card className="h-[380px] w-[300px]">
      <CardTitle
        className={
          "hover:text-cyan-500 line-clamp-2 h-[56px] mx-4 my-4 cursor-pointer items-center justify-between overflow-hidden text-lg transition-colors"
        }
      >
        {ngo.name}
      </CardTitle>
      <CardContent className="grid gap-4 text-center">
        <div className="flex h-[200px] items-center justify-center text-center">
          <img
            src={ngo.imageUrl}
            alt={`${ngo.name} Logo`}
            className="ml-auto mr-auto max-h-[200px] max-w-[200px] rounded-lg"
          />
        </div>
        <div className="text-sm text-center">
          <p>Type: {donationType}</p>
        <p>Date: {donationDate.toString().substring(0, 10)}</p>
          {donationAmount !== 0 ? (
            <p>Amount: ${donationAmount!.toFixed(2)}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationCard;
