import { Separator } from "@/components/ui/separator";

export function BookListDisclaimer() {
  return (
    <>
      <Separator className="my-8" />
      <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
        <p>
          <strong>DISCLAIMER:</strong> The books and novels listed on this page
          are not owned by us. This list is intended for recommendation and
          discovery purposes only. All rights and ownership of the content
          belong to their respective authors and publishers.
        </p>
      </div>
    </>
  );
}
