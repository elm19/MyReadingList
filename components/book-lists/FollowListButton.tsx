"use client";
import { useState } from "react";
import { ListPlus } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  listId: string;
  isFollowing?: boolean;
  FollowerCount?: number;
};

const FollowListButton = ({isFollowing: initialFollow, listId,FollowerCount }: Props) => {
  const [isFollowing, setIsFollowing] = useState(initialFollow);
  const [count, setCount] = useState(FollowerCount || 0);
  const [loading, setLoading] = useState(false);

  const toggleFollow = async () => {
    setLoading(true);

    const res = await fetch("/api/book-list/track", {
      method: "POST",
      body: JSON.stringify({
        listId,
        action: isFollowing ? "untrack" : "track",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.success) {
      setIsFollowing(!isFollowing)
      setCount(isFollowing ? count - 1 : count + 1);
    };
    
    setLoading(false);
  };
  return (
    <Button
      variant={isFollowing ? "default" : "outline"}
      size="sm"
      onClick={toggleFollow}
      className="flex items-center space-x-2"
      disabled={loading}
    >
      <ListPlus
        className={`w-4 h-4 ${isFollowing ? "text-red-500 fill-current" : ""}`}
      />
      
      <span>{isFollowing ? "Tracked" : "Track Now"}</span>
      <span>
        ({count})
      </span>
    </Button>
  );
};

export default FollowListButton;
