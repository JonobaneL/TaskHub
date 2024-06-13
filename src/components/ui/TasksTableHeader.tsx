import { TableTanstack } from "@/models/projectTypes";
import { TableHead, TableHeader, TableRow } from "./table";
import HeaderCellContent from "./HeaderCellContent";

const TasksTableHeader = ({ table }: TableTanstack) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((head) => (
        <TableRow key={head.id} className="divide-x h-9">
          {head.headers.map((header) => (
            <TableHead
              key={header.id}
              style={{
                width: `${header.column.columnDef.size}rem`,
                minWidth: `${header.column.columnDef?.minSize}rem`,
              }}
              className={`group px-0 text-center font-main h-9`}
            >
              <HeaderCellContent header={header} />
            </TableHead>
          ))}
          <TableHead className="px-0 h-9" />
          {/*empty*/}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TasksTableHeader;
