import TablesNav from "@/components/TablesNav";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import TasksTable from "@/components/TasksTable";
import { TableParams } from "@/models/projectTypes";
import Loader from "@/components/ui/Loader";
import { TableProvider } from "@/context/TableContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const TablesPage = () => {
  const { isLoading, project } = useTypeSelector(
    (state) => state.projectReducer
  );
  return (
    <TableProvider>
      <section className="p-5">
        <h2 className="font-main text-[1.5rem] font-semibold text-text">
          Tables
        </h2>
        <TablesNav />
        {isLoading ? (
          <Loader type="bouncing" />
        ) : (
          <ScrollArea className="space-y-4 pb-8">
            {project.tables?.map((item: TableParams) => (
              <TasksTable key={item.id} table={item} />
            ))}
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        )}
      </section>
    </TableProvider>
  );
};

export default TablesPage;
