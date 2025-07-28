"use client"; //makes the component client so we can use hooks 

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

const Loader = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setProgress(60);
    setHidden(false);

    const timer = setTimeout(() => {
      setProgress(100);

      setTimeout(() => {
        setHidden(true);
        setProgress(0);
      }, 200);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <Progress value={progress} className={cn(hidden && "hidden", "fixed top-0 z-100 ")} />
  );
};

export default Loader;