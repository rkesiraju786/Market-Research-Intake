import { motion } from "framer-motion";
import { useLocation } from "wouter";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const [location] = useLocation();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [prevLocation, setPrevLocation] = useState(location);
  const [showExitAnimation, setShowExitAnimation] = useState(false);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    if (location !== prevLocation) {
      setShowExitAnimation(true);
      const timeout = setTimeout(() => {
        setPrevLocation(location);
        setShowExitAnimation(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [location, prevLocation, isFirstRender]);

  const variants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <motion.div
      className={cn("w-full", className)}
      initial="initial"
      animate="animate"
      exit={showExitAnimation ? "exit" : undefined}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}