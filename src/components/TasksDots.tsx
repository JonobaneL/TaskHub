import { useTableContex } from "@/context/TableContext";

const TasksDots = () => {
  const { selectedGroups } = useTableContex();

  return (
    <div className="flex gap-0.5 mt-1 flex-wrap">
      {Object.keys(selectedGroups).map((key) =>
        selectedGroups[key].tasks.map((_, index) => (
          <div
            key={index}
            style={{ background: selectedGroups[key].color }}
            className="size-2 rounded-full"
          />
        ))
      )}
    </div>
  );
};

export default TasksDots;
