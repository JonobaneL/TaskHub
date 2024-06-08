import { AiOutlinePushpin } from "react-icons/ai";

type BadgeProps = {
  triger: boolean;
};

const PinBadge = ({ triger }: BadgeProps) => {
  return triger ? (
    <div className="h-fit w-fit px-1.5 py-0.5 rounded-sm  flex gap-1 text-white items-center bg-accent-b absolute right-0 -top-5 text-sm">
      <AiOutlinePushpin size="1rem" />
      Pinned
    </div>
  ) : null;
};

export default PinBadge;
