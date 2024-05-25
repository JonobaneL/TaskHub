import { LabelParams } from "@/models/projectTypes";
import edit from "../assets/images/edit.svg";
import { Button } from "./ui/button";
import { useState } from "react";
import LabelsForm from "./LabelsForm";
import { LabelsTypeParams } from "@/models/RareUseTypes";

type ListProps = {
  labels: LabelParams[] | null;
  onChange: (value: string) => void;
  closeHandler: () => void;
  type: LabelsTypeParams;
};

const LabelsList = ({ labels, onChange, closeHandler, type }: ListProps) => {
  const handler = (value: string) => {
    onChange(value);
    closeHandler();
  };
  const [labelsForm, setLabelsForm] = useState(false);
  const labelsLength = labels?.length || 0;
  return (
    <div className="w-fit">
      {!labelsForm ? (
        <>
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
                onClick={() => handler(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="h-[1px] w-full bg-accent my-2" />
          <Button
            variant="ghost"
            className="h-9 w-full rounded-sm"
            onClick={() => setLabelsForm(true)}
          >
            <img src={edit} alt="Edit" />
            <p className="font-medium text-text ml-2 rounded-sm">Edit Labels</p>
          </Button>
        </>
      ) : (
        <LabelsForm
          type={type}
          onClose={() => setLabelsForm(false)}
          labels={labels}
        />
      )}
    </div>
  );
};

export default LabelsList;
