import { LabelParams } from "@/models/projectTypes";
import edit from "../assets/images/edit.svg";
import { Button } from "./ui/button";
import { useState } from "react";
import LabelsForm from "./LabelsForm";
import { LabelsTypeParams } from "@/models/RareUseTypes";
import LablesList from "./LabelsList";

type LabelsProps = {
  labels: LabelParams[] | null;
  onChange: (value: string) => void;
  closeHandler: () => void;
  type: LabelsTypeParams;
};

const Labels = ({ labels, onChange, closeHandler, type }: LabelsProps) => {
  const handler = (value: string) => {
    onChange(value);
    closeHandler();
  };

  const [labelsForm, setLabelsForm] = useState(false);
  return (
    <div className="w-fit ">
      {labelsForm ? (
        <LabelsForm
          type={type}
          onClose={() => setLabelsForm(false)}
          labels={labels}
        />
      ) : (
        <div>
          <LablesList labels={labels} handler={handler} />
          <div className="h-[1px] w-full bg-accent my-2" />
          <Button
            variant="ghost"
            className="h-9 w-full rounded-sm"
            onClick={() => setLabelsForm(true)}
          >
            <img src={edit} alt="Edit" />
            <p className="font-medium text-text ml-2 rounded-sm">Edit Labels</p>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Labels;
