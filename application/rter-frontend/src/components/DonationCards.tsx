import { NGOProps } from "@/utils/types/ngoProps";
import { useEffect, useState } from "react";
import { getAllDonations } from "@/apis/donationHApi";
import { UserService } from "@/apis/profile/UserService";
import { Donation, User } from "@/utils/types";
import { getNgoById } from "@/apis/ngoApi";
import DonationCard from "./DonationCard";

const DonationCards = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [ngos, setNGOs] = useState<NGOProps[]>([]);

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

  const loadDonations = async () => {
    if (!currentUser || !currentUser.username || !currentUser.password || !currentUser.id) {
      return;
    }

    const userDonations = await getAllDonations(
      currentUser.username,
      currentUser.password,
      Number(currentUser.id)
    );

    // Fetch corresponding NGOs for each donation
    const ngoPromises = userDonations.map((donation) =>
      getNgoById(currentUser.username, currentUser.password, donation.idngo)
    );

    // Wait for all NGO requests to complete
    Promise.all(ngoPromises)
      .then((ngoData) => {
        setDonations(userDonations);
        setNGOs(ngoData);
      })
      .catch((error) => {
        console.error("Error fetching NGOs:", error);
      });
  };


  useEffect(() => {
    if (currentUser && currentUser.username && currentUser.password && currentUser.id){
      loadDonations();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-wrap justify-center px-2 pt-5">
      {donations.map((donation, index) => (
        <div key={index} className="m-2">
          <DonationCard
            ngo={ngos[index]}
            donationType={donation.type} 
            donationDate={donation.createdat} 
            donationAmount={donation.amount} 
          />
        </div>
      ))}
    </div>
  );
};

export default DonationCards;
