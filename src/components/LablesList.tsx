import { LableParams } from "@/models/projectTypes";
import edit from "../assets/images/edit.svg";
import { Button } from "./ui/button";
import { useState } from "react";
import LablesForm from "./LablesForm";
import { LablesTypeParams } from "@/models/RareUseTypes";

type ListProps = {
  lables: LableParams[] | null;
  onChange: (value: string) => void;
  closeHandler: () => void;
  type: LablesTypeParams;
};

const LablesList = ({ lables, onChange, closeHandler, type }: ListProps) => {
  const handler = (value: string) => {
    onChange(value);
    closeHandler();
  };
  const [lablesForm, setLablesForm] = useState(false);
  const lablesLength = lables?.length || 0;
  return (
    <div className="w-fit">
      {!lablesForm ? (
        <>
          <ul
            className={`grid gap-x-1.5 gap-y-1 ${
              lablesLength <= 5 ? "grid-cols-1" : "grid-cols-2"
            } w-fit`}
          >
            {lables?.map((item, index) => (
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
            onClick={() => setLablesForm(true)}
          >
            <img src={edit} alt="Edit" />
            <p className="font-medium text-text ml-2 rounded-sm">Edit Lables</p>
          </Button>
        </>
      ) : (
        <LablesForm
          type={type}
          onClose={() => setLablesForm(false)}
          lables={lables}
        />
      )}
    </div>
  );
};

export default LablesList;
