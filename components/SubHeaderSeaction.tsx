import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SmallSearchInput from "./SmallSearchInput";

const SubHeaderSeaction = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div className="flex justify-between sm:flex-row items-center w-full sm:items-center gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Our Lists</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm hidden md:block text-muted-foreground whitespace-nowrap">
            Sort by:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="border rounded-md px-2 py-1 text-sm hover:border-muted-foreground flex gap-2">
              Last Updated
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/lists" className="w-full">
                  Last Updated
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="?sort=most-popular" className="w-full">
                  Most Popular
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SmallSearchInput params="search"/>

      {/* <Link
          href="/lists/my-lists"
          className="text-primary hover:text-primary/80 font-medium transition-colors whitespace-nowrap"
        >
          My Lists
        </Link> */}
    </div>
  );
};
export default SubHeaderSeaction;
