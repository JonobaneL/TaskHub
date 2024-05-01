import { getAllTables, getAllTasks } from "@/firebase/tablesAPI";
import { useAsync } from "@/hooks/useAsync";
import { ProjectParams, TableParams, TaskParams } from "@/models/projectTypes";
import Loader from "./ui/Loader";
import PieChart from "./ui/PieChart";
import { useMemo } from "react";
import { DynamicKeyObject } from "@/models/RareUseTypes";
import { fakeMembers } from "@/data/fakeMembers";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

type ProjectInfoProps = {
  project: ProjectParams;
};
//split component
const ProjectInfo = ({ project }: ProjectInfoProps) => {
  const [isTablesLoading, , tables] = useAsync<TableParams[]>(() =>
    getAllTables(project.tablesID)
  );
  const [isTasksLoading, , tasks] = useAsync<TaskParams[]>(() =>
    getAllTasks(project.tasksID)
  );
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
  const navigate = useNavigate();
  console.log(chartData);
  return (
    <li className="flex justify-between divide-x-[1px] divide-slate-300">
      <div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(`project/${project.id}/tables`)}
        >
          <div
            style={{ background: project.color }}
            className="w-9 h-9 rounded-sm shadow-sm  font-main text-white font-semibold text-center leading-9"
          >
            {project.name?.slice(0, 1)}
          </div>
          <p className="font-medium font-main text-sm">{project.name}</p>
        </div>
        <div className="space-y-1 mt-4">
          {isTablesLoading || isTasksLoading ? (
            <Loader />
          ) : (
            <>
              <p className="text-sm">Groups: {tables?.length}</p>
              <p className="text-sm">Tasks: {tasks?.length}</p>
            </>
          )}
        </div>
      </div>
      <div className="pl-6">
        <PieChart params={chartData || {}} />
      </div>
      <div className="w-1/4 pl-6">
        <ul>
          {fakeMembers.map((item, index) => (
            <li
              key={index}
              className="flex gap-2 items-center hover:bg-secondary/20 px-2 py-1.5 rounded"
            >
              <img
                className="w-9 h-9 rounded-full"
                src={item.image}
                alt="avatar"
              />
              <p className="text-sm font-main">{item.name}</p>
            </li>
          ))}
        </ul>
        <Button variant="link" className="block mr-2 ml-auto">
          See All
        </Button>
      </div>
    </li>
  );
};

export default ProjectInfo;
