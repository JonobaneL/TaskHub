import {
  SingUpFormParams,
  fieldValidation,
  passwordValidation,
} from "@/data/formOptions";
import { TableParams } from "@/models/projectTypes";

export const getGroupNameValidation = (tables: TableParams[]) => {
  return {
    ...fieldValidation,
    validate: (value: string) => {
      if (tables?.find((item) => item.name === value))
        return "Group name already exists. Please choose another.";
      return true;
    },
  };
};
export const passwordConfirmValidation = {
  ...passwordValidation,
  validate: (value: string, formValues: SingUpFormParams) => {
    if (value !== formValues.password) return "Passwords do not match.";
    return true;
  },
};
