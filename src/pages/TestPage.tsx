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
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import removeIcon from "../assets/images/remove.svg";
import { LabelParams } from "@/models/projectTypes";
import ColorPicker from "@/components/ui/ColorPicker";
import { labelColors } from "@/data/table_colors";

type FormParams = {
  labels: LabelParams[];
};
const TestPage = () => {
  const handler = () => {
    console.log("Click");
  };

  return (
    <div className="border border-primary m-10 p-4 bg-slate-200">
      <div className="w-[28rem] p-5 shadow-sm bg-white">
        <h2 className="font-semibold text-primary font-main text-lg mb-2">
          New Task
        </h2>
        <p className="text-sm mb-4">
          Fill out the form below to add a new task to your project. Stay
          organized and keep track of your tasks with TaskHub!
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="bg-background shadow rounded h-12 flex items-center justify-between w-3/5 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex items-center justify-center bg-accent-b">
            <p className="font-medium text-white text-lg">3</p>
          </div>
          <p className="text-sm font-medium">Tasks selected</p>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="rounded-sm">
            Duplicate
          </Button>
          <Button variant="ghost" className="rounded-sm">
            Move To
          </Button>
          <Button variant="ghost" className="rounded-sm">
            Delete
          </Button>
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <img src={removeIcon} className="w-4 h-4" alt="close" />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default TestPage;
