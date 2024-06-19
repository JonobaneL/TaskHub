import { TableParams, TaskParams } from "@/models/projectTypes";
import TableName from "./TableName";
import { Table, flexRender } from "@tanstack/react-table";

type TableProps = {
  table: TableParams;
  collapse: boolean;
  collapseHandler: React.Dispatch<React.SetStateAction<boolean>>;
  tableTemplate: Table<TaskParams>;
};

const CollapsedTable = ({
  table,
  collapse,
  tableTemplate,
  collapseHandler,
}: TableProps) => {
  const tableFooter = tableTemplate?.getFooterGroups();
  const borderException = ["selected", "task", "notes"];
  const columns = tableTemplate.options.columns;
  const nameColumnWidth =
    columns[0].size && columns[1].size
      ? columns[0]?.size + columns[1]?.size
      : undefined;
  return (
    <div
      style={{ borderLeftColor: table.color }}
      className="flex items-center py-2 border-l-4 border-y border-r rounded-l border-y-gray-300 border-r-gray-300"
    >
      <div
        style={{
          width: nameColumnWidth ? `${nameColumnWidth}rem` : "fit-content",
        }}
      >
        <TableName
          table={table}
          collapse={collapse}
          taskAmount={table.tasks?.length || 0}
          collapseHandler={collapseHandler}
        />
      </div>

      <div>
        {tableFooter.map((footerRow) => (
          <div key={footerRow.id} className="w-fit flex divide-x border-x">
            {footerRow.headers.map((footer) => {
              if (!borderException.includes(footer.column.id))
                return (
                  <div
                    key={footer.id}
                    style={{
                      width: `${footer.column.columnDef.size}rem`,
                    }}
                    className="flex-cover"
                  >
                    <p className="text-sm text-center font-medium font-main ">
                      {flexRender(
                        footer.column.columnDef.header,
                        footer.getContext()
                      )}
                    </p>
                    <div className="h-9">
                      {flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext()
                      )}
                    </div>
                  </div>
                );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollapsedTable;
