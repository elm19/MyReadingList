import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import packageJSON from "../../package.json";

export const Footer = () => {
  const version = packageJSON.version;
  return (
    <footer className="shadow-lg border-t-1 border-accent w-full px-5 bg-white dark:bg-gray-950">
      <div className="flex flex-col">
        <div className="flex  px-4 flex-col items-center">
          <nav className="flex py-2 flex-wrap justify-center items-center gap-4">
            <Link
              href="/terms-of-service"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Use
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/changelog"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Changelog
            </Link>
          </nav>
        </div>
        <Separator />
        <div className="flex py-2 justify-center items-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OurReadingLidt.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            v {version}
          </p>
        </div>
      </div>
    </footer>
  );
};