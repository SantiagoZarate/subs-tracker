import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';

function Skeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <ShadcnSkeleton className="h-4 w-full" />
        <ShadcnSkeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function SubsSkeleton() {
  return (
    <ul className="flex flex-col">
      {Array(5)
        .fill(1)
        .map((_n, index) => (
          <Skeleton key={index} />
        ))}
    </ul>
  );
}
