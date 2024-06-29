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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestoreStorage } from "@/firebase";
import { BiImageAdd } from "react-icons/bi";
import { LuImagePlus } from "react-icons/lu";
import FileField from "@/components/ui/FileField";

type FormParams = {
  labels: LabelParams[];
};

const TestPage = () => {
  const [img, setImg] = useState(null);
  // const uploadEvent = () => {
  //   if (!img) return;
  //   const fileRef = ref(firestoreStorage, `files/${img?.name + "check2"}`);
  //   uploadBytes(fileRef, img).then(() => console.log("uploaded"));
  //   setImg(null);
  // };
  // const handler = () => {
  //   setImg(null);
  // };

  console.log(img);
  return (
    <div className="border border-primary m-10 p-4 rounded-sm shadow">
      <div className="h-4"></div>
    </div>
  );
};

export default TestPage;
