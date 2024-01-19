import Navbar from "@/components/Navbar";
import Background from "../../../public/donation-background.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { User } from "@/utils/types";
import { UserService } from "@/apis/profile/UserService";

const ChooseDonationMethodPage = () => {
  const { ngoId, emailFlag } = useParams();
  const navigate = useNavigate();
  const emailExists = emailFlag === "1" ? true : false;
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    await UserService.getCurrentUser().then((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  };


  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-10 md:flex md:flex-row "
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Card className="flex max-w-[350px] flex-col justify-between md:min-h-[460px]">
          <div>
            <CardHeader>
              <CardTitle className="mx-auto font-bold">Donate Money</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <p
                style={{ color: "#4e4e4e" }}
                className="hidden md:my-6 md:block"
              >
                Your financial support can make a big difference in the lives of
                those we serve. Monetary donations allow us to fund our programs
                and initiatives, helping us to provide essential services to
                those in need. Every dollar counts and we appreciate your
                generous support.
              </p>
              <p style={{ color: "#4e4e4e" }} className="md:hidden">
                Your support makes a difference. Every dollar counts.
              </p>
            </CardContent>
          </div>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Button
                    onClick={() => navigate("/donate/money" + "/" + ngoId)}
                    className=" w-full bg-[#1565C0] hover:bg-[#1565C0]/90"
                  >
                    Donate Now
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">Donate money to this NGO</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
        <Card className="flex max-w-[350px] flex-col justify-between md:min-h-[460px]">
          <div>
            <CardHeader>
              <CardTitle className="mx-auto font-bold">
                Donate Other Things
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm">
              <p
                style={{ color: "#4e4e4e" }}
                className="hidden md:my-6 md:block"
              >
                In addition to monetary donations, we also accept donations of
                goods, food, and clothing. These items can be crucial resources
                for those we serve, providing them with essential items and
                improving their quality of life. Whether it's a warm meal, a
                winter coat, or a piece of furniture, your donations can make a
                real difference.
              </p>
              <p style={{ color: "#4e4e4e" }} className="md:hidden">
                We accept donations of goods, food, and clothing. Your donations
                make a real difference.
              </p>
            </CardContent>
          </div>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Button
                    onClick={() => navigate("/donate/items" + "/" + ngoId)}
                    disabled={!emailExists}
                    className=" w-full bg-[#1565C0] hover:bg-[#1565C0]/90"
                  >
                    Donate Now
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm">
                    {emailExists
                      ? "Donate other things to this NGO"
                      : "This NGO does not have the email address available"}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChooseDonationMethodPage;
