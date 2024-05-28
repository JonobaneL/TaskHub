type ItemProps = {
  item: string;
  type: "round" | "square";
  handler: (value: string) => void;
};

const ColorPickerItem = ({ item, type, handler }: ItemProps) => {
  return (
    <li
      style={{ backgroundColor: item }}
      className={`size-[1.4rem] flex-fix cursor-pointer hover:ring-1 hover:ring-gray-500 transition duration-150 ${
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
