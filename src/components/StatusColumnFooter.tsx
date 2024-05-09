import { useTypeSelector } from "@/hooks/useReduxHooks";
import LineChart from "./ui/LineChart";
import { useMemo } from "react";
import { DynamicKeyObject } from "@/models/RareUseTypes";
import { TableTanstack } from "@/models/projectTypes";

const StatusColumnFooter = ({ table }: TableTanstack) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const currentTableID = table.options.meta?.tableID;
  const tasks = project.tables?.find(
    (item) => item.id == currentTableID
  )?.tasks;
  const chartParams = useMemo(() => {
    const initial: DynamicKeyObject =
      project.status_lables?.reduce((prev, current) => {
        return { ...prev, [current.name]: { value: 0, color: current.color } };
      }, {}) || {};
    tasks?.forEach((task) => {
      const status = task.status;
      initial[status].value = initial[status].value + 1;
    });
    return initial;
  }, [project.status_lables, tasks]);
  return (
    <div className="w-full h-full p-1.5">
      <LineChart
        config={{ width: true }}
        params={chartParams}
        asChild={true}
        total={tasks?.length || 0}
      />
    </div>
  );
};

export default StatusColumnFooter;
