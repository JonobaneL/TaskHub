import { labelColors } from "@/data/table_colors";
import { LabelFormParams } from "@/models/formTypes";
import { UseFieldArrayAppend } from "react-hook-form";

type ButtonProps = {
  append: UseFieldArrayAppend<LabelFormParams, "stages">;
};

const NewLabelButton = ({ append }: ButtonProps) => {
  const labelID = "label" + Date.now();
  const newLabelHandler = () => {
    const colorIndex =
      Math.floor(Math.random() * (labelColors.length - 0 + 1)) + 0;
    append({
      color: labelColors[colorIndex],
      name: "",
      labelID: labelID,
    });
  };
  return (
    <li
      className="w-full h-9 rounded-sm border flex items-center justify-center gap-1 hover:border-slate-400 cursor-pointer"
      onClick={newLabelHandler}
    >
      <span className="font-medium text-lg font-main text-slate-600">+</span>
      <p className="text-sm font-main">New label</p>
    </li>
  );
};

export default NewLabelButton;
