import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface BookListHeaderProps {
  name: string;
  author: string;
  lastUpdatedDate: string;
}

export function BookListHeader({
  name,
  author,
  lastUpdatedDate,
}: BookListHeaderProps) {
  return (
    <div className="flex flex-col gap-4 items-start mb-8">
      <h1 className="text-4xl font-bold text-foreground capitalize">{name}</h1>

      <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Built by</span>
          <Badge variant="secondary">{author}</Badge>
          <span>•</span>
          <span>Last updated {lastUpdatedDate || "now"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
}
