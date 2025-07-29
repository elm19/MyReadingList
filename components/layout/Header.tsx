import Navbar from "./Navbar";
import Link from "next/link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "../MoonToggle";
import Logo from "./Logo";
import { SearchInput } from "../SearchInput";
import { buttonVariants } from "../ui/button";
import { getUser } from "@/app/(auth)/actions";
import UserMenu from "./UserMenu";

const Header = async () => {
  const {user} = await getUser();

  return (
    <header className="flex z-50 items-center shadow-lg h-20 w-full px-5 bg-white dark:bg-gray-950 justify-between">
      <div className="flex items-center space-x-12">
        <Link href="/">
          <Logo />
        </Link>
        <Navbar />
      </div>
      <div className="flex items-center border-none space-x-4 leading-5 sm:space-x-6">
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </Link>
        )}
        <SearchInput />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;

