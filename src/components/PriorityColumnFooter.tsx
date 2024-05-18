import { useTypeSelector } from "@/hooks/useReduxHooks";
import { DynamicKeyObject } from "@/models/RareUseTypes";
import { TableTanstack } from "@/models/projectTypes";
import { useMemo } from "react";
import LineChart from "./ui/LineChart";

const PriorityColumnFooter = ({ table }: TableTanstack) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const currentTableID = table.options.meta?.tableID;
  const tasks = project.tables?.find(
    (item) => item.id == currentTableID
  )?.tasks;
  const chartParams = useMemo(() => {
    const initial: DynamicKeyObject =
      project.priority_lables?.reduce(
        (prev, current) => {
          return {
            ...prev,
            [current.name]: { value: 0, color: current.color },
          };
        },
        { empty: { value: 0, color: "#fff" } }
      ) || {};

    tasks?.forEach((task) => {
      const priority = task.priority || "empty";
      initial[priority].value = initial[priority].value + 1;
    });
    return initial;
  }, [project.priority_lables, tasks]);
  return (
    <div className="w-full h-full p-1.5">
      <LineChart
        config={{ width: true, tooltipAlign: "top" }}
        params={chartParams}
        asChild={true}
        total={tasks?.length || 0}
      />
    </div>
  );
};

export default PriorityColumnFooter;
