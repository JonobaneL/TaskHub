import ProjectNav from "@/components/ProjectNav";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { toggle } from "@/store/reducers/testSlice";
import { useState } from "react";

const TestPage = () => {
  const type = "round";
  const [color, setColor] = useState("#3b60d1");
  const [visible, setVisible] = useState(false);
  const colors = [
    "#3b60d1",
    "#037F4C",
    "#00C875",
    "#FFCB00",
    "#784BD1",
    "#007EB5",
    "#BB3354",
    "#FF007F",
    "#FF642E",
    "#C4C4C4",
    "#757575",
  ];
  const dispatch = useTypeDispatch();
  const handler = () => {};
  const { test } = useTypeSelector((state) => state.testReducer);
  console.log(test);
  return (
    <div className="border border-primary m-10 p-4">
      {
        <div
          style={
            test
              ? { width: "2rem", height: "2rem", background: "red" }
              : { width: "4rem", height: "4rem", background: "green" }
          }
        />
      }
      <br />
      <br />
      <br />
      <Button onClick={handler}>{test ? "Show" : "Hide"}</Button>
    </div>
  );
};

export default TestPage;
