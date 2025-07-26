"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export const SearchInput = () => {
  const [query, setQuery] = useState("");

  const [userChecked, setUserChecked] = useState(false);
  const [listsChecked, setListsChecked] = useState(true);
  const [bookChecked, setBookChecked] = useState(false);
  const [focused, setFocused] = useState(false);
  const redirectToSearchPage = () => {
    console.log(query);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"}>
              <Search className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-10">
            <div className="flex flex-col gap-4">
              <div className="flex w-full max-w-sm items-center gap-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />

                <Button onClick={redirectToSearchPage} variant={"default"}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-around">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={listsChecked}
                    onCheckedChange={(value) => setListsChecked(!!value)}
                  />
                  <span className="className=text-sm">Lists</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={bookChecked}
                    onCheckedChange={(value) => setBookChecked(!!value)}
                  />
                  <span className="text-sm">Series</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={userChecked}
                    onCheckedChange={(value) => setUserChecked(!!value)}
                  />
                  <span className="text-sm">Users</span>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            {query && query.length > 5 && (
              <ScrollArea className="h-64 w-full rounded-md border">
                searching for results of {query}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
              </ScrollArea>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div
        className={`absolute z-10 w-full mt-2 border rounded-xl bg-background shadow-md overflow-hidden transition-all duration-300 ${
          focused && query ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      ></div>
    </div>
  );
};
