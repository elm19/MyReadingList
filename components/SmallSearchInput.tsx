"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { Input } from "./ui/input";

interface SmallSearchInputProps {
    params: string
}
const SmallSearchInput = ({
    params,
}: SmallSearchInputProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

      useEffect(() => {
        if (searchQuery !== searchParams.get(params)) {
          setIsSearching(true);
          const timeoutId = setTimeout(() => {
              if(searchQuery) {
                  const newUrl = formUrlQuery({
                      params: searchParams.toString(),
                      key: params,
                      value: searchQuery,
                  });

                  router.push(newUrl, { scroll: false });
              } else {
                  if(pathname === '/lists') {
                      const newUrl = removeKeysFromUrlQuery({
                          params: searchParams.toString(),
                          keysToRemove: [params],
                      });

                      router.push(newUrl, { scroll: false });
                  }
              }
              setIsSearching(false);
          }, 500);

          return () => clearTimeout(timeoutId);
        }
    }, [searchQuery, router, searchParams, pathname, params]);

  return (
    <div className="relative">
      {!isSearching ? (
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ) : (
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search lists..."
        className={`pl-10 pr-4 py-2 w-full sm:w-64 ${
          isSearching ? 'text-muted-foreground' : ''
        }`}
      />
    </div>
  );
};
export default SmallSearchInput;
