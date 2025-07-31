import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";


const SubHeaderSeaction = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Our Lists</h1>
      <div className="flex sm:flex-row items-center w-full md:w-fit sm:items-center gap-3 sm:gap-4">
        {/* Search */}

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

        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search lists..."
            className="pl-10 pr-4 py-2 border bg-background text-foreground placeholder:text-muted-foreground rounded-lg text-sm hover:border-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-64"
          />
        </div>

        {/* <Link
          href="/lists/my-lists"
          className="text-primary hover:text-primary/80 font-medium transition-colors whitespace-nowrap"
        >
          My Lists
        </Link> */}

        
      </div>
    </div>
  );
};
export default SubHeaderSeaction;
