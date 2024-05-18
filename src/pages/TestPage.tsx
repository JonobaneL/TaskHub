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
  const [date, setDate] = useState<Date | undefined>();
  const dateString = date?.toDateString().split(" ") || "";
  const today = new Date(Date.now());
  const dateToShow = date ? dateString[2] + " " + dateString[1] : "";
  const { project } = useTypeSelector((state) => state.projectReducer);
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTaskForm>({
    defaultValues: {
      notes: "",
      status: null,
      due_date: null,
      priority: null,
    },
  });
  const onSubmit = (data: NewTaskForm) => {
    console.log(data);
  };
  const [isHovered, setIsHovered] = useState(false);
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            variant="standart"
            placeholder="Task"
            {...register("task", fieldValidation)}
          />
          <textarea
            className="w-full h-[12rem] resize-none text-sm p-2 rounded-md border bg-transparent transition-colors focus:ring-1 focus-visible:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Notes"
            {...register("notes")}
          />
          <div className="flex item-center justify-between">
            <p className="text-sm leading-9">Status</p>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
                  <SelectTrigger className="w-1/2 focus:ring-primary">
                    <SelectValue placeholder="Select status" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    {["status-1", "status-2", "status-3"].map((item, index) => (
                      <SelectItem
                        key={index}
                        className="capitalize"
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {/* <Select>
              <SelectTrigger className="w-1/2 focus:ring-primary">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {["status-1", "status-2", "status-3"].map((item, index) => (
                  <SelectItem key={index} className="capitalize" value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
          <div className="flex item-center justify-between">
            <p className="text-sm leading-9">Due Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <input
                  className="h-9 w-1/4 border rounded-md text-sm"
                  readOnly
                  value={dateToShow}
                />
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  fromMonth={today}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex item-center justify-between">
            <p className="text-sm leading-9">Priority</p>
            <Select>
              <SelectTrigger className="w-1/2 focus:ring-primary">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {["priority-1", "priority-2", "priority-3"].map(
                  (item, index) => (
                    <SelectItem key={index} className="capitalize" value={item}>
                      {item}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-1/4 h-9 text-white font-main self-end mt-2"
            variant="default"
            type="submit"
            disabled={isSubmitting}
          >
            Add Task
          </Button>
        </form>
      </div>
      <br />
      <Button onClick={handler}>Click</Button>
      <br />
      <br />
      <br />
      <LineChart
        params={{
          done: {
            value: 2,
            color: "green",
          },
          none: {
            value: 1,
            color: "grey",
          },
          "in progres": {
            value: 4,
            color: "yellow",
          },
        }}
        total={7}
      />
      <br />
      <br />
      <br />
      <div></div>
      <div
        className={`relative h-24 w-30 border border-red-500`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute w-24 h-24 bg-blue-500 transition"
          style={{ left: isHovered ? "100px" : 0 }}
        >
          Hover me
        </div>
      </div>
      <div className="flex h-10 w-full border border-red-500 group overflow-hidden">
        <div className="w-10 h-10 bg-green-400 -translate-x-10 group-hover:translate-x-0 transition-transform	duration-300"></div>
        <div className=" w-20 h-full bg-slate-800 -translate-x-10	group-hover:translate-x-2 transition-transform	duration-300"></div>
      </div>
    </div>
  );
};

export default TestPage;
