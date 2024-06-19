type ItemProps = {
  item: string;
  type: "round" | "square";
  handler: (value: string) => void;
};

const ColorPickerItem = ({ item, type, handler }: ItemProps) => {
  return (
    <li
      style={{ backgroundColor: item }}
      className={`size-5 cursor-pointer hover:scale-[1.15]  transition-all duration-150 ${
        type == "round" ? "rounded-full" : "rounded-sm"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        handler(item);
      }}
    />
  );
};

export default ColorPickerItem;
