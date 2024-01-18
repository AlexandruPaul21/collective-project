import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

interface DonateCardProps {
  title: string;
  description: string;
  buttonDescription: string;
  buttonRedirect: string;
  emailExists: boolean;
}

const DonateCard = ({
  title,
  description,
  buttonDescription,
  buttonRedirect,
  emailExists = true,
}: DonateCardProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(buttonRedirect);
  };
  return (
    <Card className="flex min-h-[460px] max-w-[350px] flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle className="mx-auto font-bold"> {title}</CardTitle>
        </CardHeader>
        <CardContent className="my-6 text-sm text-center">
          <p style={{ color: "#4e4e4e" }}>{description}</p>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={onClick} disabled={!emailExists} className=" w-full">
          {buttonDescription}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonateCard;
