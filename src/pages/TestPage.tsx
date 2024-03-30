import ProjectNav from "@/components/ProjectNav";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const handler = (name: string) => {
    setColor(name);
    setVisible(false);
  };
  return (
    <div className="border border-primary m-10 p-4">
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default TestPage;
