"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOut from "../SignOut";

interface UserMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const userInitial = user?.user_metadata.username.charAt(0).toUpperCase();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
        data-slot="menubar-trigger"
        >
          <Button variant={"ghost"} size={"icon"} asChild>
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/book-lists">My Lists</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/profile">Profile</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/book-lists/new">Add New List</Link>
          </MenubarItem>
          <MenubarSeparator />
          
              <MenubarItem variant="destructive"><SignOut /></MenubarItem>
          
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenu;
