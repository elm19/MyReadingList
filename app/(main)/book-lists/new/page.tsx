"use client";

import GridShape from "@/components/layout/GridShape";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Novel } from "@/lib/types";
import { Edit2Icon } from "lucide-react";
import { AddNewNovel } from "@/components/AddNewNovel";
import { useUser } from "@/app/context/UserContext";
import { Badge } from "@/components/ui/badge";

export default function NewBookListPage() {
  const user = useUser();

  const [isPreview, setIsPreview] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [name, setName] = useState("this is the name of the book list");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [Novels, setNovels] = useState<Novel[]>([]);
  const [newBookName, setNewBookName] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookDescription, setNewBookDescription] = useState("");

  const handleNextStep = () => {
    setIsFirstStep(false);
  };

  const handleAddBook = () => {
    if (newBookName.trim() !== "") {
      setNovels([
        ...Novels,
        {
          id: Date.now().toString(), // Simple unique ID for now
          name: newBookName,
          author: newBookAuthor,
          description: newBookDescription,
        },
      ]);
      setNewBookName("");
      setNewBookAuthor("");
      setNewBookDescription("");
    }
  };

  const handleDeleteBook = (id: string) => {
    setNovels(Novels.filter((book) => book.id !== id));
  };

  useEffect(() => {
    setIsPreview(name.length < 10);
  }, [name]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-primary-400/10 to-primary-600/10 dark:from-primary-900 dark:to-primary-950">
        <div className="absolute inset-0">
          <GridShape />
        </div>
        <div className="relative z-10 flex flex-col w-full p-12">
          <Link href="/" className="mt-10 transition-transform hover:scale-105">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Create a Book List
            </h1>
          </Link>
          <div className="max-w-md">
            <p className="font-medium text-gray-600 dark:text-gray-300">
              You Will need to give your book list a a name and optionally a
              description, and then you can start adding books to it.
            </p>
          </div>
          <div className="mt-12 p-6 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
            {/* Form for book list details */}
            {isFirstStep ? (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">List Name</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Book List"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="A collection of fantasy novels..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="private"
                    checked={isPrivate}
                    onCheckedChange={(checked) =>
                      setIsPrivate(checked as boolean)
                    }
                  />
                  <Label htmlFor="private">Make this list private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="private"
                    checked={isPrivate}
                    onCheckedChange={(checked) =>
                      setIsPrivate(checked as boolean)
                    }
                  />
                  <Label htmlFor="private">Make this list private</Label>
                </div>
                <Button onClick={handleNextStep} disabled={isPreview || false}>
                  Next
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="capitalize flex items-center">
                  <span className="text-xl font-bold">Title: {name}</span>
                  <Button
                    variant="link"
                    size={"sm"}
                    className="ml-2"
                    onClick={() => setIsFirstStep(true)}
                  >
                    Edit title/description{" "}
                    <Edit2Icon className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg flex justify-start gap-4 items-center text-left font-semibold mb-2">
                    <span>Books in this List</span>
                    <AddNewNovel
                      setNewBookName={setNewBookName}
                      newBookName={newBookName}
                      handleAddBook={handleAddBook}
                      setNewBookAuthor={setNewBookAuthor}
                      newBookAuthor={newBookAuthor}
                      setNewBookDescription={setNewBookDescription}
                      newBookDescription={newBookDescription}
                    />
                  </h3>
                  {Novels.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      No books added yet.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {Novels.map((book) => (
                        <li
                          key={book.id}
                          className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-gray-700"
                        >
                          <div>
                            <p className="font-medium">{book.name}</p>
                            {book.author && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                by {book.author}
                              </p>
                            )}
                            {book.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {book.description}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // For simplicity, let's just pre-fill the add form for editing
                                // A more robust solution would involve a modal or inline editing
                                setNewBookName(book.name);
                                setNewBookAuthor(book.author || "");
                                setNewBookDescription(book.description || "");
                                handleDeleteBook(book.id); // Remove old entry, then user can re-add with changes
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteBook(book.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 z-1 flex flex-col jp-4 sm:p-8 lg:p-12 bg-white dark:bg-gray-900">
        <div>Preview</div>
        <div className="w-full max-w-md">
          {isPreview ? (
            <div className="text-gray-500 dark:text-gray-400">
              <h2 className="text-2xl font-bold mb-4">
                Give Your&apos;s List a Great Name!
              </h2>
              <p className="mb-2">
                A good name helps others find what they&apos;re looking for.
                (e.g., &quot;Novels where the main character has...&quot;)
              </p>
              <p className="mb-2">
                If your list is public, we might improve its name later, merge
                it with similar lists, or even delete it if it&apos;s not high
                quality.
              </p>
              <p className="text-sm italic">
                (Name must be at least 10 characters long to proceed)
              </p>
            </div>
          ) : (
            <div className="capitalize">
              <h2 className="text-3xl  font-bold mb-2">
                {name} {" by "}
                <Badge className="underline">
                  {user && `${user?.user_metadata?.username}`}{" "}
                </Badge>
              </h2>
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              )}
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                {isPrivate
                  ? "This list will be private."
                  : "This list will be public."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
