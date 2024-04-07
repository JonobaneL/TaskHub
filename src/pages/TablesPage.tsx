import { TaskType, todo } from "@/data/tableTest";
import TablesNav from "@/components/TablesNav";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { todoColumns } from "@/data/todo_table";
import TableTemplate from "@/components/TableTemplate";
import TableName from "@/components/TableName";
import { useAsync } from "@/hooks/useAsync";
import { getAllTables } from "@/firebase/tablesAPI";
import { useTypeSelector } from "@/hooks/useReduxHooks";

const TablesPage = () => {
  const columns: ColumnDef<TaskType>[] = todoColumns;
  const [data, setData] = useState(todo);
  // const [table, setTable] = useState({
  //   name: "To do",
  //   color: "#3b60d1",
  // });
  const { isLoading, project } = useTypeSelector(
    (state) => state.projectReducer
  );
  // console.log(project);
  return (
    <section>
      <h2 className="font-main text-[1.5rem] font-semibold text-text">
        Tables
      </h2>

      <TablesNav />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        project.tables?.map((item) => (
          <div key={item.id}>
            <TableName table={item} taskAmount={data.length} />
            <TableTemplate columns={columns} data={data} setData={setData} />
          </div>
        ))
      )}
      <br />
      <br />
    </section>
  );
};

export default TablesPage;
