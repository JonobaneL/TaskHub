import { IoAlertCircle } from "react-icons/io5";
import { HiMiniCheckCircle } from "react-icons/hi2";

export const dateStatuses = [
  {
    name: "attention",
    content: "Deadline Passed",
    icon: (
      <>
        <IoAlertCircle size="1.4rem" color="#DF2F4A" />
      </>
    ),
  },
  {
    name: "done",
    content: "Done on time",
    icon: (
      <>
        <HiMiniCheckCircle size="1.4rem" color="#1C9764" />
      </>
    ),
  },
  {
    name: "done-later",
    content: "Done after deadline",
    icon: (
      <>
        <IoAlertCircle size="1.4rem" color="#1C9764" />
      </>
    ),
  },
];
