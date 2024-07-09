import { useState } from "react";
import FieldParamsList from "./FieldParamsList";

type FieldProps = {
  validation?: (value: string) => boolean;
  list: string[];
  setList: (value: string[]) => void;
};

const ListField = ({
  validation = (_: string) => true,
  list,
  setList,
}: FieldProps) => {
  const [content, setContent] = useState("");
  const addParam = (value: string) => {
    const exist = list.find((item) => item == value);
    if (!exist) setList([...list, value]);
  };
  const onChange = (value: string) => {
    setContent(value);
    if (value.includes(" ")) {
      const tempValue = value.split(" ");
      addParam(tempValue[0]);
      setContent("");
    }
  };
  const onBlur = (value: string) => {
    if (value) {
      addParam(value);
      setContent("");
    }
  };

  const isListValid = !list.some((item) => validation(item) == false);
  return (
    <div
      className={`border w-full h-fit border-input bg-transparent  text-sm shadow-sm transition-colors rounded-md has-[:focus]:ring-1 has-[:focus]:ring-primary ${
        isListValid ? "" : "ring-1 ring-red-600"
      }`}
    >
      <FieldParamsList list={list} setList={setList} validation={validation} />
      <input
        type="text"
        className="text-sm w-full h-9 px-2 py-1 bg-transparent outline-none"
        placeholder="Enter one or more email addresses"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
      />
    </div>
  );
};

export default ListField;
