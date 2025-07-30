"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Flag, Loader2 } from "lucide-react";
import { useState } from "react";
import { Novel } from "@/lib/types";
import { BookListMetadata } from "../types";
import { User } from "@supabase/supabase-js";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

const isNovelIncomplete = (novel: Novel) => {
  return !novel.author || !novel.description;
};

interface BookListPreviewProps {
  isPreview: boolean;
  listDetails: BookListMetadata;
  user: User | null;
  novels: Novel[];
}

export const BookListPreview = ({
  isPreview,
  listDetails,
  user,
  novels,
}: BookListPreviewProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(
    Math.floor(Math.random() * 1000)
  );

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  const lastUpdatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isPreview) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <div className="text-gray-500 dark:text-gray-400">
          <h2 className="text-2xl font-bold mb-4">
            Give Your List a Great Name!
          </h2>
          <p className="mb-2">
            A good name helps others find what they&apos;re looking for.
          </p>
          <p className="text-sm italic">
            (Name must be at least 10 characters long to proceed)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pt-10 min-h-3xl px-2 flex flex-col rounded-lg">
      {/* Header Section */}
      <div className="flex capitalize flex-col gap-4 items-start mb-6">
        <h1 className="text-4xl  font-bold text-gray-900 dark:text-gray-100 mb-3">
          {listDetails.name}
        </h1>
        <div className="flex items-center cap justify-between w-full text-sm text-gray-500 dark:text-gray-400">
          <div>
            <span>Built by </span>
            <Badge variant="secondary">{user?.user_metadata?.username}</Badge>
            <span className="mx-2">•</span>
            <span>Last updated {lastUpdatedDate}</span>
          </div>
          <Button
            variant={isFollowing ? "default" : "outline"}
            size="sm"
            onClick={handleFollow}
            className="flex items-center space-x-2"
          >
            <Heart
              className={`w-4 h-4 ${
                isFollowing ? "text-red-500 fill-current" : ""
              }`}
            />
            {/* <span>{isFollowing ? "Following" : "Follow"}</span> */}
          </Button>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <p className="whitespace-pre-wrap">
          {listDetails.description || "This list has no description yet."}
        </p>
      </div>

      <Separator className="my-6" />

      {/* Novels Section */}
      <div>
        {novels.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No books have been added to this list yet.
          </p>
        ) : (
          <ul className="space-y-8">
            {novels.map((book, index) => (
              <li key={book.id}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl capitalize font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    {index + 1}. {book.name}{" "}
                    {book.author ? `By ${book.author}` : ""}
                    {isNovelIncomplete(book) && (
                      <HoverCard>
                        <HoverCardTrigger>
                          <Loader2 className="w-4 h-4 ml-2 animate-spin text-gray-500" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="flex bg-background rounded-lg border p-2 ml-10 mt-5 justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex gap-2">
                                <Loader2 className="w-4 h-4 ml-2 animate-spin text-gray-500" />
                                <h4 className="text-sm font-semibold">
                                  Collecting Book details
                                </h4>
                              </div>
                              <div className="text-muted-foreground flex gap-2 text-xs">
                                <p>to help us speed up the process. </p>
                                <button
                                  className="hover:cursor-pointer"
                                  onClick={() =>
                                    alert(
                                      "add some info about the novel:" +
                                        book.name
                                    )
                                  }
                                >
                                  Click here
                                </button>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </h3>
                </div>

                <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {book.description || "No description available."}
                  </p>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Disclaimer Section */}
      <Separator className="my-8 mt-20 self-end" />
      <div className="text-xs  text-gray-500 dark:text-gray-400">
        <p>
          DISCLAIMER: The books and novels listed on this page are not owned by
          us. This list is intended for recommendation and discovery purposes
          only. All rights and ownership of the content belong to their
          respective authors and publishers.
        </p>
      </div>
    </div>
  );
};
