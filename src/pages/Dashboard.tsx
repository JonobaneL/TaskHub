import ExtendedProjectsList from "@/components/ExtendedProjectsList";
import { Button } from "@/components/ui/button";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { updateLables } from "@/store/thunks/projectsThunks";

const Dashboard = () => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const dispatch = useTypeDispatch();
  const handler = () => {
    dispatch(
      updateLables({
        type: "status_lables",
        lables: project.status_lables || [],
      })
    );
  };
  return (
    <div key="check">
      <h1 className="font-main text-primary font-semibold text-3xl mb-2">
        Dashboard
      </h1>
      <p className="font-main font-medium">
        Hello there! Welcome to TaskHub, your all-in-one platform for project
        management and team collaboration. Stay organized, stay productive, and
        let's get to work!
      </p>
      <section className="w-full rounded-sm shadow-md p-4 mt-4">
        <div className="flex justify-between mb-4">
          <h3 className="font-main font-medium text-md">Projects</h3>
          <Button
            variant="default"
            className="h-8 p-2 font-medium text-background text-[0.8rem] font-main rounded-sm"
          >
            New Project
          </Button>
        </div>
        <ExtendedProjectsList />
      </section>
    </div>
  );
};

export default Dashboard;
