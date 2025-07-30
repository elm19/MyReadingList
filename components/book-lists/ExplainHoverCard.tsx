"use client"
import { Loader2 } from "lucide-react";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

const ExplainHoverCard = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Loader2 className="w-4 h-4 ml-2 animate-spin text-gray-500" />
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex bg-background rounded-lg border p-2 ml-10 mt-5 justify-between gap-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Loader2 className="w-4 h-4 ml-2 animate-spin text-gray-500" />
              <h4 className="text-sm font-semibold">Collecting Book details</h4>
            </div>
            <div className="text-muted-foreground flex gap-2 text-xs">
              <p>to help us speed up the process. </p>
              <button
                className="hover:cursor-pointer"
                onClick={() =>
                  alert("add some info about the novel:" + " name, author, etc.")
                }
              >
                Click here
              </button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default ExplainHoverCard;
