import { useTypeSelector } from "@/hooks/useReduxHooks";

export const getLabel = (
  status: string | null,
  priority: string | undefined | null
) => {
  const { project } = useTypeSelector((state) => state.projectReducer);
  const statusLabel = project.status_labels?.find(
    (item) => item.labelID === status
  );
  const priorityLabel = project.priority_labels?.find(
    (item) => item.labelID === priority
  );

  return {
    statusLabel,
    priorityLabel,
  };
};
