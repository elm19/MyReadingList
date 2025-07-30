"use client";
import { Button } from "../ui/button";
import { Flag, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BookListItemMenu = () => {
  return (
    <div className="flex gap-2 justify-end mt-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            variant="ghost"
            size="icon"
            className="text-gray-500"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="hover:cursor-pointer">
            Add to Your Lists
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            Add Data to Book
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>



      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-red-600"
          >
            <Flag className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent>
        <DropdownMenuLabel>
            Report Issue
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-amber-500 hover:text-red-600">
            Book doesn&apos;t exist  or Book details are incorrect
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            Book does not fit the list&apos;s theme
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer">
            Other issue
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-red-600"
      >
        <Flag className="w-4 h-4" />
      </Button> */}
    </div>
  );
};
export default BookListItemMenu;
