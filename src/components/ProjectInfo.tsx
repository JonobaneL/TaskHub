import { getAllTasks } from "@/firebase/tablesAPI";
import { useAsync } from "@/hooks/useAsync";
import { ProjectParams, TaskParams } from "@/models/projectTypes";
import Loader from "./ui/Loader";
import ProjectInfoMembers from "./ProjectInfoMembers";
import ProjectInfoChart from "./ProjectInfoChart";
import ProjectInfoDetails from "./ProjectInfoDetails";

type ProjectInfoProps = {
  project: ProjectParams;
};
//include more data along with development some features
const ProjectInfo = ({ project }: ProjectInfoProps) => {
  const [isTasksLoading, , tasks] = useAsync<TaskParams[]>(() =>
    getAllTasks(project.tasksID)
  );
  return (
    <li className="flex justify-between divide-x-[1px] divide-slate-300">
      {isTasksLoading ? (
        <Loader />
      ) : (
        <>
          <ProjectInfoDetails project={project} tasks={tasks} />
          <ProjectInfoChart project={project} tasks={tasks} />
          <ProjectInfoMembers />
        </>
      )}
    </li>
  );
};

export default ProjectInfo;
