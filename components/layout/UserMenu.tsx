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
          <Avatar>
            
            <AvatarImage alt={`${user.user_metadata.username} avatar`} src={user.user_metadata.avatar_url} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/lists">My Lists</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/profile">Profile</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/lists/new">Add New List</Link>
          </MenubarItem>
          <MenubarSeparator />
          
              <MenubarItem variant="destructive"><SignOut /></MenubarItem>
          
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default UserMenu;
