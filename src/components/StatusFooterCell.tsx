import { useTypeSelector } from "@/hooks/useReduxHooks";
import LineChart from "./ui/LineChart";
import { useMemo } from "react";
import { TableTanstack } from "@/models/projectTypes";
import { chartGenerating } from "@/utils/chartGenerating";

const StatusFooterCell = ({ table }: TableTanstack) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const currentTableID = table.options.meta?.tableID;
  const tasks = project.tables?.find(
    (item) => item.id == currentTableID
  )?.tasks;

  const chartParams = useMemo(
    () => chartGenerating("status", project.status_labels || [], tasks || []),
    [project.status_labels, tasks]
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

export default StatusFooterCell;
