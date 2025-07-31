"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface CardListProp {
  id: string;
  name: string;
  updatedBy?: string;
  updateAt?: string;
  book_count?: number;
  follower_count?: number;
}
const CardList = ({
  id,
  name,
  book_count,
  updatedBy,
  updateAt,
  follower_count,
}: CardListProp) => {
  const router = useRouter();
  return (
    <div className="block" onClick={() => router.push(`/lists/${id}`)}>
      <div className="py-6 hover:bg-muted/50 transition-colors duration-200 cursor-pointer rounded-lg px-4 -mx-4">
        <div className="flex justify-between items-start gap-4">
          {/* Left Section - Main Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/lists/${id}`}>
              <h2 className="text-xl capitalize font-semibold mb-2 hover:text-primary transition-colors">
                {name}
              </h2>
            </Link>

            <div className="flex flex-wrap flex-col gap-4 ml-2 text-sm text-muted-foreground">
              <div className="flex md:flex-row flex-col gap-2 md:gap-4 items-start md:items-center">
                <div className="flex items-center gap-1">
                  <span>Last updated by</span>
                  <Link
                    href="/profile/john_doe"
                    className="text-primary hover:text-primary/80 font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{updatedBy}
                  </Link>
                </div>
                <span className="text-muted-foreground/60 hidden md:inline">
                  •
                </span>

                <div>
                  <span>
                    {formatDistanceToNow(new Date(updateAt || "0"), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                    />
                  </svg>
                  <span>{book_count || 0} books</span>
                </div>

                <div className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>{follower_count} followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Action Indicator */}
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardList;
