import { cn } from "@/lib/utils";
import React from "react";

interface PulseProps {
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

export function Pulse({
  className,
  children,
  size = "md",
  color = "primary",
}: PulseProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const colorClasses = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <span className="relative flex">
      <span
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
          colorClasses[color]
        )}
      />
      <span
        className={cn(
          "relative inline-flex rounded-full",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      >
        {children}
      </span>
    </span>
  );
}