import { Skeleton } from "./skeleton";

const ReplySkeleton = () => {
  return (
    <div className="flex item-start gap-2.5">
      <Skeleton className="size-9 rounded-full bg-gray-300" />
      <Skeleton className="w-32 h-16 rounded-md bg-gray-300" />
    </div>
  );
};

export default ReplySkeleton;
