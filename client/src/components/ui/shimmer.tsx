import { cn } from "@/lib/utils";

interface ShimmerProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: boolean;
  circle?: boolean;
}

export function Shimmer({
  className,
  height = "h-6",
  width = "w-full",
  rounded = true,
  circle = false,
}: ShimmerProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        height,
        width,
        rounded && !circle && "rounded",
        circle && "rounded-full",
        className
      )}
    />
  );
}

export function ShimmerText({
  lines = 1,
  className,
  lastLineWidth = "100%",
}: {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          className={i === lines - 1 && lastLineWidth !== "100%" ? `w-[${lastLineWidth}]` : ""}
        />
      ))}
    </div>
  );
}

export function ShimmerCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-5 rounded-xl border p-4", className)}>
      <div className="space-y-3">
        <Shimmer className="h-3 w-[40%]" />
        <Shimmer className="h-3 w-[60%]" />
      </div>
      <div className="space-y-3">
        <Shimmer className="h-3" />
        <Shimmer className="h-3" />
        <Shimmer className="h-3 w-[80%]" />
      </div>
    </div>
  );
}