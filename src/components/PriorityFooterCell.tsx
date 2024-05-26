import { useTypeSelector } from "@/hooks/useReduxHooks";
import { TableTanstack } from "@/models/projectTypes";
import { useMemo } from "react";
import LineChart from "./ui/LineChart";
import { chartGenerating } from "@/utils/chartGenerating";

const PriorityFooterCell = ({ table }: TableTanstack) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const currentTableID = table.options.meta?.tableID;
  const tasks = project.tables?.find(
    (item) => item.id == currentTableID
  )?.tasks;

  const chartParams = useMemo(
    () =>
      chartGenerating("priority", project.priority_labels || [], tasks || []),
    [project.priority_labels, tasks]
  );
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

export default PriorityFooterCell;
