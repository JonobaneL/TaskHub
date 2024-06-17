import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "./ui/context-menu";
import { useTypeSelector } from "@/hooks/useReduxHooks";
import { TaskContextMenuProps } from "@/models/RareUseTypes";
import { useMenuMethods } from "@/hooks/useMenuMethods";

const TaskContextMenu = ({ table, row, children }: TaskContextMenuProps) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const currentTableID = table.options.meta?.tableID || "";
  const currentTaskID = row.original.id;
  const { deleteHandler, moveToHandler, duplicateHandler } = useMenuMethods(
    currentTaskID,
    currentTableID
  );
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem inset className="font-main" onClick={duplicateHandler}>
          Duplicate
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger
            inset
            className="font-main"
            disabled={project.tables?.length == 1}
          >
            Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {project?.tables?.map((item) => (
              <ContextMenuItem
                inset
                className="font-main"
                key={item.id}
                disabled={item.id == currentTableID}
                onClick={() => moveToHandler(item.id)}
              >
                {item.name}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem inset className="font-main" onClick={deleteHandler}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TaskContextMenu;
