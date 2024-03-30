import { TaskType, todo } from "@/data/tableTest";
import TablesNav from "@/components/TablesNav";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { todoColumns } from "@/data/todo_table";
import TableTemplate from "@/components/TableTemplate";
import TableName from "@/components/TableName";

const TablesPage = () => {
  const columns: ColumnDef<TaskType>[] = todoColumns;
  const [data, setData] = useState(todo);
  const [table, setTable] = useState({
    name: "To do",
    color: "#3b60d1",
  });
  return (
    <section>
      <h2 className="font-main text-[1.5rem] font-semibold text-text">
        Tables
      </h2>
      <TablesNav />
      <TableName table={table} taskAmount={data.length} />
      <TableTemplate columns={columns} data={data} setData={setData} />
      <br />
      <br />
    </section>
  );
};

export default TablesPage;
