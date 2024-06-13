import { LabelFormParams } from "@/models/formTypes";
import { TaskKeys } from "@/models/projectTypes";
import { FieldArrayWithId } from "react-hook-form";
import { useOptionUse } from "./useOptionUse";
import { useTypeDispatch } from "./useReduxHooks";
import { updateTask } from "@/store/thunks/tasksThunks";

export const useLableField = (
  fieldName: string,
  fieldItem: FieldArrayWithId<LabelFormParams, "stages", "id">,
  updateLabel: (key: string, value: string) => void,
  remove: () => void
) => {
  const dispatch = useTypeDispatch();
  const ids = useOptionUse(fieldName as TaskKeys, fieldItem.labelID);
  const removeHandler = () => {
    if (fieldItem?.role) return;
    if (ids.length === 0) remove();
  };
  const blurHandler = (value: string) => {
    if (value == "") {
      if (ids.length === 0) remove();
      return;
    }
    if (fieldItem.labelID !== value) {
      if (ids.length > 0) {
        ids.forEach((item) => {
          console.log(item);
          dispatch(
            updateTask({
              ...item,
              key: fieldName as TaskKeys,
              value: fieldItem.labelID,
            })
          );
        });
      }
      updateLabel("name", value);
    }
  };
  const colorHandler = (value: string) => {
    updateLabel("color", value);
  };
  return { ids, removeHandler, blurHandler, colorHandler };
};
