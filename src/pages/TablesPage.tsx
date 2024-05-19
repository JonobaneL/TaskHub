import TablesNav from "@/components/TablesNav";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import TasksTable from "@/components/TasksTable";
import { TableParams } from "@/models/projectTypes";
import Loader from "@/components/ui/Loader";

const TablesPage = () => {
  const { isLoading, project } = useTypeSelector(
    (state) => state.projectReducer
  );
  return (
    <section className="p-5">
      <div className="">
        <h2 className="font-main text-[1.5rem] font-semibold text-text">
          Tables
        </h2>
        <TablesNav />
      </div>
      {isLoading ? (
        <Loader type="bouncing" />
      ) : (
        <div className="space-y-4 w-full overflow-x-scroll pb-10">
          {project.tables?.map((item: TableParams) => (
            <TasksTable key={item.id} table={item} />
          ))}
        </div>
      )}
      <br />
      <br />
    </section>
  );
};

export default TablesPage;
