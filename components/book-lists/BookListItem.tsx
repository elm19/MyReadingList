import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Flag, Loader2 } from "lucide-react";
import { Novel } from "@/lib/types";

interface BookListItemProps {
  book: Novel;
  index: number;
}

export function BookListItem({ book, index }: BookListItemProps) {
  return (
    <div className="group">
      <div className="flex items-start gap-4">
        {/* Book Number */}
        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
          {index + 1}
        </div>

        {/* Book Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-foreground capitalize flex items-center gap-2">
              {book.name}
              {book.author && (
                <span className="text-base font-normal text-muted-foreground">
                  by {book.author}
                </span>
              )}

              {book.is_complete && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="cursor-help">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                        <h4 className="text-sm font-semibold">
                          Collecting Book Details
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Help us speed up the process by providing information
                        about this book.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          alert(`Add information about: ${book.name}`)
                        }
                      >
                        Add Details
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </h3>

            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Flag className="w-4 h-4" />
            </Button>
          </div>

          <div className="pl-4 border-l-2 border-border">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {book.description || "No description available for this book yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
