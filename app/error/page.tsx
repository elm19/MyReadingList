import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <Alert variant="destructive" className="max-w-md w-full mb-8">
        <ExclamationTriangleIcon className="h-6 w-6 text-destructive mr-2 inline" />
        <AlertTitle className="text-xl font-bold">Something went wrong</AlertTitle>
        <AlertDescription className="mt-2 text-base">
          Sorry, an error occurred while processing your request.<br />
          Please try again or return to the homepage.
        </AlertDescription>
      </Alert>
      <Link href="/" passHref>
        <Button variant="default" size="lg">
          Go Home
        </Button>
      </Link>
    </div>
  );
}