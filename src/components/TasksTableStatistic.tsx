import { TableTanstack } from "@/models/projectTypes";
import { flexRender } from "@tanstack/react-table";

const TasksTableStatistic = ({ table }: TableTanstack) => {
  const footerGroups = table.getFooterGroups();
  const borderException = ["selected", "task"];
  return (
    <div className="w-fit h-9 pl-1">
      {footerGroups.map((footerGroup) => (
        <div key={footerGroup.id} className="flex">
          {footerGroup.headers.map((footer) => (
            <div
              key={footer.id}
              className="p-0 h-9 flex-cover rounded-b-sm"
              style={{
                width: `${footer.column.columnDef.size}rem`,
                minWidth: `${footer.column.columnDef.minSize}rem`,
                border: !borderException.includes(footer.column.id)
                  ? "1px solid rgb(226, 232, 240)"
                  : "none",
              }}
            >
              {flexRender(footer.column.columnDef.footer, footer.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TasksTableStatistic;
