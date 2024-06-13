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
import { Input } from "@/components/ui/input";
import magGlass from "../assets/images/mag-glass.svg";
import { IoIosClose } from "react-icons/io";
import { useReactTable } from "@tanstack/react-table";

type FormParams = {
  labels: LabelParams[];
};

const TestPage = () => {
  return (
    <div className="border border-primary m-10 p-4 rounded-sm shadow"></div>
  );
};

export default TestPage;
