"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { BookListMetadata } from "../types";

interface BookListMetadataFormProps {
  listDetails: BookListMetadata;
  setListDetails: (listDetails: BookListMetadata) => void;
  handleNextStep: () => void;
  isPreview: boolean;
}

export const BookListMetadataForm = ({
  listDetails,
  setListDetails,
  handleNextStep,
  isPreview,
}: BookListMetadataFormProps) => (
  <div className="grid gap-4">
    <div className="grid gap-2">
      <Label htmlFor="name">List Name</Label>
      <Input
        id="name"
        placeholder="My Awesome Book List"
        value={listDetails.name}
        onChange={(e) =>
          setListDetails({ ...listDetails, name: e.target.value })
        }
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="description">Description (Optional)</Label>
      <Textarea
        id="description"
        placeholder="A collection of fantasy novels..."
        value={listDetails.description}
        onChange={(e) =>
          setListDetails({ ...listDetails, description: e.target.value })
        }
      />
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox
        id="private"
        checked={listDetails.isPrivate}
        onCheckedChange={(checked) =>
          setListDetails({ ...listDetails, isPrivate: checked as boolean })
        }
      />
      <Label htmlFor="private">Make this list private</Label>
    </div>
    <Button onClick={handleNextStep} disabled={isPreview || false}>
      Next
    </Button>
  </div>
);