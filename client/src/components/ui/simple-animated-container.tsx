import { cn } from "@/lib/utils";
import React from "react";

interface SimpleAnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "none";
}

export function SimpleAnimatedContainer({
  children,
  className,
  animation = "none"
}: SimpleAnimatedContainerProps) {
  let animationClass = "";
  
  switch (animation) {
    case "fadeIn":
      animationClass = "animate-fadeIn";
      break;
    case "fadeInUp":
      animationClass = "animate-fadeInUp";
      break;
    case "fadeInDown":
      animationClass = "animate-fadeInDown";
      break;
    default:
      animationClass = "";
  }

  return (
    <div className={cn(animationClass, className)}>
      {children}
    </div>
  );
}