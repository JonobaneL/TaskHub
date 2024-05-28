import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import ColorPickerItem from "./ColorPickerItem";

type PickerProps = {
  type: "round" | "square";
  color: string;
  colors: readonly string[];
  onChange: (name: string) => void;
  asChild?: boolean;
};

const ColorPicker = ({
  type,
  color,
  colors,
  onChange,
  asChild = false,
}: PickerProps) => {
  const [visible, setVisible] = useState(false);
  const handler = (colorName: string) => {
    onChange(colorName);
    setVisible(false);
  };

  return (
    <Popover open={visible} onOpenChange={setVisible}>
      <PopoverTrigger asChild>
        <div
          onClick={() => setVisible(true)}
          style={{ background: color }}
          className={`${
            asChild ? "h-full aspect-square	flex-cover" : "size-5"
          } cursor-pointer ${type == "round" ? "rounded-full" : "rounded-sm"}`}
        />
      </PopoverTrigger>
      <PopoverContent id="popOver" align="start" className="w-36">
        <ul className="flex gap-1.5 flex-wrap justify-center">
          {colors.map(
            (item, index) =>
              item !== color && (
                <ColorPickerItem
                  key={index}
                  item={item}
                  type={type}
                  handler={handler}
                />
              )
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
