import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, CircleDollarSign, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-[7vh] w-full justify-center overflow-hidden bg-slate-100 z-1 border-b-2 border-gray-300">
      <div className="flex h-[7vh] flex-row items-center justify-between px-10 ">
        <div>
          <img
            src="/icon.svg"
            alt="img"
            className="h-10 w-10 overflow-hidden"
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <a href="/favourites" className="">
            <div className="flex items-center">
              <Heart className="mr-1 h-4 w-4" />
              <span className="text-lg">Favourites</span>
            </div>
          </a>
          <a href="/donations">
            <div className="flex items-center">
              <CircleDollarSign className="mr-1 h-4 w-4" />
              <span className="text-lg">Donations</span>
            </div>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-[2px]">
                <span className="text-lg">Username</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Transactions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
