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
import { Controller, useForm } from "react-hook-form";

type NewTaskForm = {
  task: string;
  notes: string;
  status: string | null;
  due_date: string | null;
  priority: string | null;
};

const TestPage = () => {
  const handler = () => {
    console.log("Click");
  };

  const [status, setStatus] = useState("none");
  const [due_date, setDate] = useState("Sat Apr 20 2024");
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
      <Button onClick={() => setStatus("done")}>Done</Button>
      <div className="w-1/5 h-10 relative border border-red-500 flex items-center justify-center">
        <p className="text-sm">{due_date}</p>
      </div>
    </div>
  );
};

export default TestPage;
