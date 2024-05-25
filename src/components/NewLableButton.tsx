import { lableColors } from "@/data/table_colors";
import { LableFormParams } from "@/models/formTypes";
import { UseFieldArrayAppend } from "react-hook-form";

type ButtonProps = {
  append: UseFieldArrayAppend<LableFormParams, "stages">;
};

const NewLableButton = ({ append }: ButtonProps) => {
  const lableID = "lable" + Date.now();
  const newLableHandler = () => {
    const colorIndex =
      Math.floor(Math.random() * (lableColors.length - 0 + 1)) + 0;
    append({
      color: lableColors[colorIndex],
      name: "",
      lableID: lableID,
    });
  };
  return (
    <li
      className="w-full h-9 rounded-sm border flex items-center justify-center gap-1 hover:border-slate-400 cursor-pointer"
      onClick={newLableHandler}
    >
      <span className="font-medium text-lg font-main text-slate-600">+</span>
      <p className="text-sm font-main">New lable</p>
    </li>
  );
};

export default NewLableButton;
