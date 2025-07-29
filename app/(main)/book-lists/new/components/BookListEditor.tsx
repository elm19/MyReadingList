"use client";

import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2 } from "lucide-react";
import { AddNewNovel } from "@/components/AddNewNovel";
import { Alert } from "@/components/ui/alert";
import { BookListMetadata } from "../types";
import { Novel } from "@/lib/types";

interface BookListEditorProps {
  listDetails: BookListMetadata;
  setIsFirstStep: (arg: boolean) => void;
  novels: Novel[];
  handleDeleteBook: (arg: string) => void;
  handleEditBook: (arg: string) => void;
  handleAddBook: () => void;
  newBookDetails: Novel;
  setNewBookDetails: (arg: Novel) => void;
  HandleAddList: () => void
}

export const BookListEditor = ({
  listDetails,
  setIsFirstStep,
  novels,
  handleDeleteBook,
  handleEditBook,
  handleAddBook,
  newBookDetails,
  setNewBookDetails,
  HandleAddList,
}: BookListEditorProps) => (
  <div className="grid gap-4">
    <div className="capitalize  text-left flex gap-2">
      <span className="text-xl font-bold">{listDetails.name}</span>
      <Button
        variant="link"
        size={"sm"}
        className=""
        onClick={() => setIsFirstStep(true)}
      >
        <Edit2Icon className="w-6 h-6" />
      </Button>
    </div>

    <div className="mt-6">
      <div className="flex justify-between gap-2 flex-col md:flex-row  mb-10">
        <h3 className="text-lg flex justify-between md:justify-start gap-4 items-center text-left font-semibold mb-2">
          <span>Books in this List</span>
          <AddNewNovel
            setNewBookName={(name) =>
              setNewBookDetails({ ...newBookDetails, name })
            }
            newBookName={newBookDetails.name}
            handleSave={handleAddBook}
            setNewBookAuthor={(author) =>
              setNewBookDetails({ ...newBookDetails, author })
            }
            newBookAuthor={newBookDetails.author}
            setNewBookDescription={(description) =>
              setNewBookDetails({ ...newBookDetails, description })
            }
            newBookDescription={newBookDetails.description}
          />
        </h3>
        <Button size={"lg"} disabled={novels.length<=1} onClick={HandleAddList}>Finish Edit</Button>
      </div>

      {novels.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          This list is empty, add series to it by clicking on the add button
          above.
        </p>
      ) : (
        <div className="space-y-4">
          {novels.map((book) => (
            <Alert
              key={book.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{book.name}</p>
                {book.author && <p className="text-sm">by {book.author}</p>}
                {book.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {book.description}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <AddNewNovel
                  type="edit"
                  book={book}
                  setNewBookName={(name) =>
                    setNewBookDetails({ ...newBookDetails, name })
                  }
                  newBookName={newBookDetails.name}
                  handleSave={() => handleEditBook(book.id)}
                  setNewBookAuthor={(author) =>
                    setNewBookDetails({ ...newBookDetails, author })
                  }
                  newBookAuthor={newBookDetails.author}
                  setNewBookDescription={(description) =>
                    setNewBookDetails({ ...newBookDetails, description })
                  }
                  newBookDescription={newBookDetails.description}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  </div>
);
