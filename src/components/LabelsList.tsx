import { LabelParams } from "@/models/projectTypes";

type ListProps = {
  labels: LabelParams[] | null;
  handler: (value: string) => void;
};

const LabelsList = ({ labels, handler }: ListProps) => {
  const labelsLength = labels?.length || 0;

  return (
    <ul
      className={`grid gap-x-1.5 gap-y-1 ${
        labelsLength <= 5 ? "grid-cols-1" : "grid-cols-2"
      } w-fit`}
    >
      {labels?.map((item, index) => (
        <li
          key={index}
          className="w-[10.5rem] h-9 text-background capitalize text-center leading-9 cursor-pointer rounded-sm text-sm"
          style={{ backgroundColor: item.color }}
          onClick={() => handler(item.labelID)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default LabelsList;
