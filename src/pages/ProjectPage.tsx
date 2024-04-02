import ProjectNav from "@/components/ProjectNav";
import { Outlet } from "react-router-dom";

const ProjectPage = () => {
  return (
    <main className="flex gap-10 px-[2.2rem] py-[1.4rem]">
      <ProjectNav />
      <section className="p-[1rem] rounded shadow-md w-full bg-[#fff]">
        <Outlet />
      </section>
    </main>
  );
};

export default ProjectPage;
