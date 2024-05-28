import { useTypeSelector } from "@/hooks/useReduxHooks";

export const getLabelsColors = (
  status: string | null,
  priority: string | undefined | null
) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const statusColor = project.status_labels?.find(
    (item) => item.name === status
  )?.color;
  const priorityColor = project.priority_labels?.find(
    (item) => item.name === priority
  )?.color;

  return {
    statusColor,
    priorityColor,
  };
};
