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
      project.status_lables?.reduce((prev, current) => {
        return { ...prev, [current.name]: { value: 0, color: current.color } };
      }, {}) || {};
    tasks?.forEach((task) => {
      const status = task.status;
      initial[status].value = initial[status].value + 1;
    });
    return initial;
  }, [project.status_lables, tasks?.length]);
  return (
    <div className="pl-6">
      <PieChart params={chartData} />
    </div>
  );
};

export default ProjectInfoChart;
