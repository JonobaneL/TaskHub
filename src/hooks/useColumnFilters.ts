import { defaultColumns } from "@/data/defaultColumns";
import { ColumnFiltersParams } from "@/models/TableTypes";
import { useState } from "react";

export const useColumnFilters = () => {
  const [filters, setFilters] = useState<ColumnFiltersParams>(
    defaultColumns.reduce(
      (prev, item) => {
        return { ...prev, [item.label]: [] };
      },
      { task: "" }
    )
  );

  const columnFilters = Object.keys(filters).map((key) => {
    return { id: key, value: filters[key] };
  });
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const changeFilters = (key: string, value: string) => {
    setFilters((p) => {
      if (p[key].includes(value))
        return {
          ...p,
          [key]: Array.isArray(p[key])
            ? p[key].filter((item: string) => item != value)
            : "", //check later how to remove this warning
        };
      return { ...p, [key]: [...p[key], value] };
    });
  };
  const clearFilter = (key: string) => {
    setFilters((p) => {
      return { ...p, [key]: [] };
    });
  };
  return {
    filters,
    setFilters,
    columnFilters,
    groupsFilter,
    setGroupsFilter,
    changeFilters,
    clearFilter,
  };
};
