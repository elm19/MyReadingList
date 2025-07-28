"use client";

import GridShape from "@/components/layout/GridShape";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Novel } from "@/lib/types";
import { useUser } from "@/app/context/UserContext";
import { BookListMetadataForm } from "./components/BookListMetadataForm";
import { BookListEditor } from "./components/BookListEditor";
import { BookListPreview } from "./components/BookListPreview";
import { BookListMetadata, NewBookDetails } from "./types";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function NewBookListPage() {
  const user = useUser();

  const [isPreview, setIsPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [listDetails, setListDetails] = useState<BookListMetadata>({
    name: "",
    description: "",
    isPrivate: false,
  });


  const [novels, setNovels] = useState<Novel[]>([]);
  const [newBookDetails, setNewBookDetails] = useState<NewBookDetails>({
    name: "",
    author: "",
    description: "",
  });

  const handleNextStep = () => {
    setIsFirstStep(false);
  };

  const handleAddBook = () => {
    if (newBookDetails.name.trim() !== "") {
      setNovels([
        {
          id: Date.now().toString(), // Simple unique ID for now
          ...newBookDetails,
        },
        ...novels,
      ]);
      setNewBookDetails({ name: "", author: "", description: "" });
    }
  };

  const handleDeleteBook = (id: string) => {
    setNovels(novels.filter((book) => book.id !== id));
  };

  const handleEditBook = (id: string) => {
    setNovels(
      novels.map((book) =>
        book.id === id
          ? {
              ...book,
              ...newBookDetails,
            }
          : book
      )
    );
    setNewBookDetails({ name: "", author: "", description: "" });
  };

  useEffect(() => {
    setIsPreview(listDetails.name.length < 10);
  }, [listDetails.name]);
  const HandleAddList = async () => {

    try {
      const response = await fetch('/api/book-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...listDetails,
          books: novels
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create book list')
      }

      console.log(

        `Successfully created "${result.data.book_list.name}" with ${result.data.total_books} books!`
      )
      

    } catch (err) {
      console.error('Error creating book list:', err)
      console.log(err.message)
    } 

  }
  return (
    <div className="relative min-h-screen lg:flex">
      {/* Form Section */}
      <div
        className={`relative bg-gradient-to-b from-primary-400/10 to-primary-600/10 dark:from-primary-900 dark:to-primary-950 lg:w-1/2 ${
          showPreview ? "hidden lg:flex" : "flex w-full lg:w-5/6"
        }`}
      >
        <div className="absolute inset-0">
          <GridShape />
        </div>
        <div className="relative z-10 flex flex-col w-full max-w-4xl p-12">
          <Link href="/" className="mt-10 transition-transform hover:scale-105">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Create a Book List
            </h1>
          </Link>
          <div className="max-w-md">
            <p className="font-medium text-gray-600 dark:text-gray-300">
              You will need to give your book list a name and optionally a
              description, and then you can start adding books to it.
            </p>
          </div>
          <div className="mt-12 p-6 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
            {isFirstStep ? (
              <BookListMetadataForm
                listDetails={listDetails}
                setListDetails={setListDetails}
                handleNextStep={handleNextStep}
                isPreview={isPreview}
              />
            ) : (
              <BookListEditor
                listDetails={listDetails}
                setIsFirstStep={setIsFirstStep}
                novels={novels}
                handleDeleteBook={handleDeleteBook}
                handleEditBook={handleEditBook}
                handleAddBook={handleAddBook}
                newBookDetails={newBookDetails}
                setNewBookDetails={setNewBookDetails}
                HandleAddList={HandleAddList}
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div
        className={`flex-1 z-10 p-4 sm:p-8 lg:p-12 ${
          showPreview ? "flex w-full lg:w-1/2" : "hidden"
        }`}
      >
        <BookListPreview
          isPreview={isPreview}
          listDetails={listDetails}
          user={user}
          novels={novels}
        />
      </div>

      {/* Toggle Button */}
        <div className={cn("absolute top-2 right-4 z-20 flex items-center space-x-2",buttonVariants({variant: "secondary"}) )}>
          <div>
            Preview
          </div>
          <Switch onClick={() => setShowPreview(!showPreview)}  checked={showPreview}/>

        </div>
    </div>
  );
}