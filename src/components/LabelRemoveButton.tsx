import Helper from "./ui/Helper";
import { IoCloseCircleOutline } from "react-icons/io5";

type ButtonProps = {
  handler: () => void;
  idsLength: number;
  role?: string | undefined;
};

const LabelRemoveButton = ({ handler, idsLength, role = "" }: ButtonProps) => {
  const content =
    role == "none" || role == "done"
      ? "Can't be deleted"
      : "Can't be deleted while in use";
  return (
    <div
      onClick={handler}
      className="absolute right-1.5 bg-background cursor-pointer opacity-0 invisible group-hover:opacity-100  group-hover:visible"
    >
      <Helper side="right" content={content} disableContent={idsLength == 0}>
        <IoCloseCircleOutline size="1.3rem" className="text-gray-500" />
      </Helper>
    </div>
  );
};

export default LabelRemoveButton;
