import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "image" | "circle";
}

export default function Skeleton({ className, variant = "text" }: SkeletonProps) {
  const base = "animate-shimmer rounded-[--radius-md]";

  const variants = {
    text: "h-4 w-full",
    card: "h-48 w-full rounded-[--radius-xl]",
    image: "h-64 w-full rounded-[--radius-xl]",
    circle: "h-12 w-12 rounded-full",
  };

  return <div className={cn(base, variants[variant], className)} />;
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-[--radius-xl] border border-[--color-border] space-y-4">
      <Skeleton variant="circle" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
