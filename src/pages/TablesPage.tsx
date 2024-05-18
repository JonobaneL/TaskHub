import TablesNav from "@/components/TablesNav";
import loaderIcon from "../assets/images/bouncingLoader.svg";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import TasksTable from "@/components/TasksTable";
import { TableParams } from "@/models/projectTypes";

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
        <div className="flex justify-center h-24">
          <img src={loaderIcon} alt="Loading..." />
          {/*make a separate component*/}
        </div>
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
