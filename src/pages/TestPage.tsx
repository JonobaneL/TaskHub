import DateStatus from "@/components/DateStatus";
import TaskContextMenu from "@/components/TaskContextMenu";
import DateSelect from "@/components/ui/DateSelect";
import Field from "@/components/ui/Field";
import LineChart from "@/components/ui/LineChart";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { fieldValidation } from "@/data/formOptions";

import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { LabelParams } from "@/models/projectTypes";
import ColorPicker from "@/components/ui/ColorPicker";
import { labelColors } from "@/data/table_colors";
import { Input } from "@/components/ui/input";
import magGlass from "../assets/images/mag-glass.svg";
import { IoIosClose } from "react-icons/io";
import { useReactTable } from "@tanstack/react-table";
import { ref, uploadBytes } from "firebase/storage";
import { firestoreStorage } from "@/firebase";
import { BiImageAdd } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import FileField from "@/components/ui/FileField";

type FormParams = {
  labels: LabelParams[];
};

const TestPage = () => {
  const [img, setImg] = useState<File | null>(null);
  const uploadEvent = () => {
    if (!img) return;
    const fileRef = ref(firestoreStorage, `files/${img?.name + "check2"}`);
    uploadBytes(fileRef, img).then(() => console.log("uploaded"));
    setImg(null);
  };
  const handler = () => {
    setImg(null);
  };
  return (
    <div className="border border-primary m-10 p-4 rounded-sm shadow">
      {/* <div className="flex items-center gap-2">
        <label className="w-fit h-fit block">
          <div className="size-16 border cursor-pointer rounded shadow gap-1 p-1 flex items-center justify-center flex-col overflow-hidden">
            <LuImagePlus size="1.2rem" className="text-primary" />
            <p className="text-xs font-main font-medium">Browse</p>
            <input
              id="#img"
              className="size-0"
              onChange={(e) =>
                setImg(e.target.files ? e.target.files[0] : null)
              }
              type="file"
              accept=".svg,.jpg,.png,.jpeg"
            />
          </div>
        </label>
        <p className="text-sm font-main">{img?.name}</p>
      </div> */}
      <div className="h-4"></div>
      <FileField
        icon={<LuImagePlus size="1.2rem" className="text-primary" />}
        file={img}
        onChange={(e) => setImg(e.target.files ? e.target.files[0] : null)}
        accept=".svg,.jpg,.png,.jpeg"
      />

      <Button onClick={handler} className="text-white font-main mt-4">
        Upload Image
      </Button>
    </div>
  );
};

export default TestPage;
