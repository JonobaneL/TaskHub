import Helper from "./ui/Helper";
import removeIcon from "../assets/images/remove.svg";

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
        <img src={removeIcon} alt="remove" className="size-4" />
      </Helper>
    </div>
  );
};

export default LabelRemoveButton;
