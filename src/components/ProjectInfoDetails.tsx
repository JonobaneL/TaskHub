import { getAllTables } from "@/firebase/tablesAPI";
import { useAsync } from "@/hooks/useAsync";
import { ProjectParams, TableParams, TaskParams } from "@/models/projectTypes";
import { useNavigate } from "react-router-dom";
import Loader from "./ui/Loader";

type DetailsProps = {
  project: ProjectParams;
  tasks: TaskParams[] | undefined;
};

const ProjectInfoDetails = ({ project, tasks }: DetailsProps) => {
  const [isTablesLoading, , tables] = useAsync<TableParams[]>(() =>
    getAllTables(project.tablesID)
  );
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(`project/${project.id}/tables`)}
      >
        <div
          style={{ background: project.color }}
          className="w-9 h-9 rounded-sm shadow-sm font-main text-white font-semibold text-center leading-9"
        >
          {project.name?.slice(0, 1)}
        </div>
        <p className="font-medium font-main text-sm">{project.name}</p>
      </div>
      <div className="space-y-1 mt-4">
        {isTablesLoading ? (
          <Loader />
        ) : (
          <>
            <p className="text-sm">Groups: {tables?.length}</p>
            <p className="text-sm">Tasks: {tasks?.length}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectInfoDetails;
