import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import edit from "../assets/images/edit.svg";
import { useTableContex } from "@/context/TableContext";

const EditColumns = () => {
  const { columns, setColumns } = useTableContex();
  const allChecked = !columns.some((item) => !item.checked);
  const checkedCount = columns.reduce(
    (prev, item) => (item.checked ? prev + 1 : prev),
    0
  );
  const checkHandler = (key: string, value: boolean) => {
    setColumns((p) =>
      p.map((item) => {
        if (item.label == key) return { ...item, checked: value };
        return item;
      })
    );
  };
  const allHandler = (value: boolean) => {
    setColumns((p) =>
      p.map((item) => {
        return { ...item, checked: value };
      })
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 p-2 rounded-sm font-medium text-text font-main text-[0.8rem]"
        >
          <img src={edit} alt="edit" className="mr-1" />
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <h3 className="font-main mb-3 border-b pb-1 text-sm font-medium">
          Display columns
        </h3>
        <ul className="">
          <li className="mb-2">
            <Label className="flex items-center gap-2 text-sm font-normal font-main">
              <Checkbox
                checked={allChecked}
                onCheckedChange={(value: boolean) => allHandler(value)}
              />
              All Columns
              <span className="font-light text-xs pl-2">
                {checkedCount} Selected
              </span>
            </Label>
          </li>
          {columns.map((item) => (
            <li
              key={item.label}
              className="ml-1 px-1.5 py-2 hover:bg-accent rounded-sm transition-colors duration-2"
            >
              <Label className="flex items-center gap-2 text-sm font-normal font-main">
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={(value: boolean) =>
                    checkHandler(item.label, value)
                  }
                />
                {item.name}
              </Label>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default EditColumns;
