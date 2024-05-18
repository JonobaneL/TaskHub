import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type PickerProps = {
  type: "round" | "square";
  color: string;
  colors: readonly string[];
  onChange: (name: string) => void;
};

const ColorPicker = ({ type, color, colors, onChange }: PickerProps) => {
  const [visible, setVisible] = useState(false);
  const handler = (colorName: string) => {
    onChange(colorName);
    setVisible(false);
  };

  return (
    <Popover open={visible} onOpenChange={setVisible}>
      <PopoverTrigger>
        <div
          onClick={() => setVisible(true)}
          style={{ background: color }}
          className={`size-5 cursor-pointer ${
            type == "round" ? "rounded-full" : "rounded-sm"
          }`}
        />
      </PopoverTrigger>
      <PopoverContent id="popOver" align="start" className="w-36">
        <ul className="flex gap-2 flex-wrap">
          {colors.map(
            (item, index) =>
              item !== color && (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className={`size-5 cursor-pointer hover:ring-1 hover:ring-gray-500 transition duration-150 ${
                    type == "round" ? "rounded-full" : "rounded-sm"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handler(item);
                  }}
                />
              )
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
