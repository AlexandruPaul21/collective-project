import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, CircleDollarSign, ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { capitalizeString } from "@/lib/utils.ts";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { useSearch } from "./providers/SearchProvider";
import SandwichMenu from "./HamburgerMenu";

const NavbarWithSearch = () => {
  const [username, setUsername] = useState("Username");

  const [placeholder, setPlaceholder] = useState("Search for an NGO");

  const { setSearchValue } = useSearch();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // 768px is typically the breakpoint for 'md'
        setPlaceholder("Search");
      } else {
        setPlaceholder("Search for an NGO");
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(capitalizeString(username || "") || "Username");
  }, []);

  return (
    <div className="z-1 border-gray-200 bg-white h-[80px] w-full justify-center overflow-hidden border-b-2">
      <div className="flex h-[80px] flex-row items-center justify-between px-10 ">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center justify-center">
            <img
              src="/logo.png"
              alt="img"
              className="h-10 w-10 overflow-hidden"
            />
            <h1 className="hidden text-xl font-bold lg:block lg:text-lg">
              CharityHub
            </h1>
          </Link>
        </div>
        <div className="relative max-h-[35px] w-[150px] md:w-[300px] lg:w-[400px] xl:w-[600px]">
          <Input
            className="text-black"
            placeholder={placeholder}
            onChange={handleSearchChange}
          />
          <Search className="absolute right-3 top-2 z-10 h-6 w-6" />
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a href="/favourites" className="">
            <div className="flex items-center">
              <Heart className="mr-1 h-4 w-4" />
              <span className="text-base lg:text-lg">Favourites</span>
            </div>
          </a>
          <a href="/donations">
            <div className="flex items-center">
              <CircleDollarSign className="mr-1 h-4 w-4" />
              <span className="text-base lg:text-lg">Donations</span>
            </div>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-[2px]">
                <span className="text-base lg:text-lg">{username}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link to="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Transactions</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-center md:hidden">
          <SandwichMenu />
        </div>
      </div>
    </div>
  );
};

export default NavbarWithSearch;
