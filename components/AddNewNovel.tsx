"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Edit2Icon, PlusIcon } from "lucide-react";
import { Novel } from "@/lib/types";

interface AddNewNovelProps {
  type?: "new" | "edit";
  book?: Novel | null;
  setNewBookName: (name: string) => void;
  newBookName: string;

  newBookDescription: string;
  setNewBookDescription: (description: string) => void;

  newBookAuthor: string;
  setNewBookAuthor: (author: string) => void;

  handleSave: () => void;
}

export function AddNewNovel({
  type = "new",
  book = null,
  setNewBookName,
  newBookName,
  handleSave,
  newBookDescription,
  setNewBookDescription,
  newBookAuthor,
  setNewBookAuthor,
}: AddNewNovelProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size={"sm"} onClick={() => {
            if(type === "edit" && book){
              setNewBookName(book.name)
              setNewBookAuthor(book.author || "")
              setNewBookDescription(book.description || "")
            }
          }}>
            {type === "new" ? (
              <PlusIcon className="w-4 h-4" />
            ) : (
              <Edit2Icon className="w-4 h-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Novel info</DialogTitle>
            <DialogDescription>
              Some novels are not available in the database, so you can add them
              manually. we will be adding
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="newBookName">Book Title</Label>
              <Input
                id="newBookName"
                placeholder="The Hobbit"
                value={newBookName}
                onChange={(e) => setNewBookName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="newBookDescription">Description (Optional)</Label>
              <Textarea
                id="newBookDescription"
                placeholder="An adventurous tale..."
                value={newBookDescription}
                onChange={(e) => setNewBookDescription(e.target.value)}
              />
            </div>
            {showMore && (
              <div className="grid gap-3">
                <Label htmlFor="newBookAuthor">Author (Optional)</Label>
                <Input
                  id="newBookAuthor"
                  placeholder="J.R.R. Tolkien"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Hide More Options" : "Show More Options"}
            </Button>
            <DialogClose asChild>
              <Button onClick={handleSave} variant="outline">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
