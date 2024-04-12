import TablesNav from "@/components/TablesNav";

import { useTypeSelector } from "@/hooks/useReduxHooks";
import TasksTable from "@/components/TasksTable";
import { TableParams } from "@/models/projectTypes";

const TablesPage = () => {
  const { isLoading, project } = useTypeSelector(
    (state) => state.projectReducer
  );
  return (
    <section>
      <h2 className="font-main text-[1.5rem] font-semibold text-text">
        Tables
      </h2>

      <TablesNav />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
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
