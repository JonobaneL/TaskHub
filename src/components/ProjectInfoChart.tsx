import { ProjectParams, TaskParams } from "@/models/projectTypes";
import PieChart from "./ui/PieChart";
import { useMemo } from "react";
import { DynamicKeyObject } from "@/models/RareUseTypes";

type ChartProps = {
  project: ProjectParams;
  tasks: TaskParams[] | undefined;
};

const ProjectInfoChart = ({ project, tasks }: ChartProps) => {
  const chartData = useMemo(() => {
    const initial: DynamicKeyObject =
      project.status_labels?.reduce((prev, current) => {
        return {
          ...prev,
          [current.labelID]: {
            value: 0,
            color: current.color,
            name: current.name,
          },
        };
      }, {}) || {};
    tasks?.forEach((task) => {
      const status = task.status;
      initial[status].value = initial[status].value + 1;
    });
    return initial;
  }, [project.status_labels, tasks?.length]);
  return (
    <div className="pl-6">
      <PieChart params={chartData} />
    </div>
  );
};

export default ProjectInfoChart;
