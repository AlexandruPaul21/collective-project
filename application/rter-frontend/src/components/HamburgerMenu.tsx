import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CircleDollarSign, Heart, UserSquare } from "lucide-react";

const SandwichMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Button className="w-[42px]" variant="ghost">
          <div className="relative block w-5 -translate-x-1/2 -translate-y-1/2 transform ">
            <span
              aria-hidden="true"
              className={cn(
                "absolute block h-0.5 w-5 transform bg-[#000000] transition duration-500 ease-in-out",
                { "rotate-45": isOpen, "-translate-y-1.5": !isOpen },
              )}
            ></span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute block h-0.5 w-5 transform bg-[#000000] transition duration-500 ease-in-out",
                { "opacity-0": isOpen },
              )}
            ></span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute block h-0.5 w-5 transform bg-[#000000] transition duration-500 ease-in-out",
                { "-rotate-45": isOpen, "translate-y-1.5": !isOpen },
              )}
            ></span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
      <DropdownMenuItem>
        <a href="/profile">
            <div className="flex items-center">
              <UserSquare className="mr-1 h-4 w-4" />
              <span className="text-md font-normal">Profile</span>
            </div>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/favourites">
            <div className="flex items-center">
              <Heart className="mr-1 h-4 w-4"/>
              <span className="text-md font-normal">Favourites</span>
            </div>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/donations">
            <div className="flex items-center">
              <CircleDollarSign className="mr-1 h-4 w-4" />
              <span className="text-md font-normal">Donations</span>
            </div>
          </a>
        </DropdownMenuItem>
        
      
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SandwichMenu;
