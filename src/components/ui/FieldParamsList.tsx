import { IoMdClose } from "react-icons/io";

type ListProps = {
  list: string[];
  setList: (value: string[]) => void;
  validation?: (value: string) => boolean;
};

const FieldParamsList = ({
  list,
  setList,
  validation = (_: string) => true,
}: ListProps) => {
  const deleteHandler = (value: string) => {
    setList(list.filter((item) => item !== value));
  };
  return (
    <div className={`w-full h-fit flex gap-1 ${list.length ? "p-2" : ""}`}>
      {list.map((item, index) => (
        <div
          key={index}
          className={`h-fit w-fit px-2 py-1 rounded-full ${
            validation(item)
              ? "bg-accent-b text-white"
              : "border border-red-500"
          } flex items-center gap-1`}
        >
          <p className=" text-xs">{item}</p>
          <IoMdClose
            className="cursor-pointer"
            onClick={() => deleteHandler(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default FieldParamsList;
