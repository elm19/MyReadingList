import Navbar from "./Navbar";

import Link from "next/link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "../MoonToggle";
import Logo from "./Logo";
import { SearchInput } from "../SearchInput";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex items-center h-20 w-full px-5 bg-white dark:bg-gray-950 justify-between">
      <div className="flex items-center space-x-12">
        <Link href="/">
          <Logo />
        </Link>
        <Navbar />
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        
          <Link href="sign-in">
          <Button className="h-fit">
            Sign In
          </Button>
          </Link>
        <SearchInput />
        <ThemeSwitch />
        <MobileNav />
      </div>
      
    </header>
  );
};

export default Header;
