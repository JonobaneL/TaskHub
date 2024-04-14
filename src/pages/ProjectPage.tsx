import ProjectNav from "@/components/ProjectNav";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { ProjectParams } from "@/models/projectTypes";
import { fetchProject } from "@/store/thunks/projectsThunks";
import { fetchTasks } from "@/store/thunks/tasksThunks";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(fetchProject(id))
      .then((data) => {
        console.log("project fetch end", Date.now()); //remove later
        return data;
      })
      .then((data) => {
        const project = data.payload as ProjectParams;
        dispatch(fetchTasks(project.tasksID));
      })
      .then(() => {
        console.log("tasks fetch end", Date.now()); //remove later
      });
  }, []);
  return (
    <section className="flex gap-10 w-full">
      <ProjectNav />
      <section className="p-[1rem] rounded shadow-md w-full bg-[#fff] overflow-x-hidden">
        <Outlet />
      </section>
    </section>
  );
};

export default ProjectPage;
