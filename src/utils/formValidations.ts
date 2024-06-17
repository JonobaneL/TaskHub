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
export const equalValidation = <T>(object1: T, object2: T | undefined) => {
  if (typeof object1 !== "object" || typeof object2 !== "object") return true;
  if (object1 == null || object2 == undefined) return true;
  const equalCheck = Object.keys(object1)
    .map((key) => object1[key as keyof T] == object2[key as keyof T])
    .includes(false);
  return equalCheck;
};
