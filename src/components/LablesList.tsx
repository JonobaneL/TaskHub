import { LableParams } from "@/models/projectTypes";
import edit from "../assets/images/edit.svg";
import { Button } from "./ui/button";

type ListProps = {
  lables: LableParams[] | null;
  onChange: (value: string) => void;
  closeHandler: () => void;
};
const LablesList = ({ lables, onChange, closeHandler }: ListProps) => {
  const handler = (value: string) => {
    onChange(value);
    closeHandler();
  };
  return (
    <div className="w-44">
      <ul className="space-y-1 mx-2">
        {lables?.map((item, index) => (
          <li
            key={index}
            className="w-full h-9 text-background font-medium capitalize text-center leading-9 cursor-pointer rounded-sm text-sm"
            style={{ backgroundColor: item.color }}
            onClick={() => handler(item.name)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="h-[1px] w-full bg-accent my-2" />
      <Button variant="ghost" className=" h-9 w-full">
        <img src={edit} alt="Edit" />
        <p className="font-medium text-text ml-2 rounded-sm">Edit Lables</p>
      </Button>
    </div>
  );
};

export default LablesList;
