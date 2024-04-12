import ProjectNav from "@/components/ProjectNav";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { ProjectParams } from "@/models/projectTypes";
import { fetchProject } from "@/store/reducers/projectsSlice";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(fetchProject(id)).then((data) => {
      const project = data.payload as ProjectParams;
      // project.tables
      console.log(project.tables);
      project.tables?.forEach((item) => {
        // dispatch(fetchTasks(item));
        console.log(item.tasksID);
      });
      // dispatch(fetchTasks())
    });
  }, []);
  return (
    <section className="flex gap-10">
      <ProjectNav />
      <section className="p-[1rem] rounded shadow-md w-full bg-[#fff]">
        <Outlet />
      </section>
    </section>
  );
};

export default ProjectPage;
