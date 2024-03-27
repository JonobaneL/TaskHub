import { TaskType, todo } from "@/data/tableTest";
import TablesNav from "@/components/TablesNav";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { todoColumns } from "@/data/todo_table";
import TableTemplate from "@/components/TableTemplate";

const TablesPage = () => {
  const columns: ColumnDef<TaskType>[] = todoColumns;
  const [data, setData] = useState(todo);

  return (
    <section>
      <h2 className="font-main text-[1.5rem] font-semibold text-text">
        Tables
      </h2>
      <TablesNav />
      <TableTemplate columns={columns} data={data} setData={setData} />
      <br />
      <br />
    </section>
  );
};

export default TablesPage;
