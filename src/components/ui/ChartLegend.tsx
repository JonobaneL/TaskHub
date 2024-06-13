import { ChartLegendProps } from "@/models/RareUseTypes";

const ChartLegend = ({
  params,
  keys,
  align = "left",
  onChange,
}: ChartLegendProps) => {
  const defaultKeys = Object.keys(params);
  const legendHandler = (key: string) => {
    if (keys.includes(key)) {
      onChange((p) => {
        if (p.length == 1) return p;
        return p.filter((item) => item != key);
      });
      return;
    }
    onChange((p) => [...p, key]);
  };
  const styles = {
    left: "max-w-44 space-y-1",
    right: "max-w-44 space-y-1",
    top: "max-w-48 flex gap-x-2 gap-y-1 items-center flex-wrap",
    bottom: "max-w-48 flex gap-x-2 gap-y-1 items-center flex-wrap",
  };
  return (
    <div className={`h-fit ${styles[align]}`}>
      {defaultKeys.map((item) => (
        <div
          key={item}
          className={`flex h-fit w-fit items-center gap-2 cursor-pointer ${
            params[item].value == 0 ? "pointer-events-none" : ""
          }`}
          onClick={() => legendHandler(item)}
        >
          <div
            style={{ background: params[item].color }}
            className="w-4 h-4 rounded-[2px]"
          />
          <p className="text-sm">
            -{" "}
            <span className={!keys.includes(item) ? "line-through" : ""}>
              {params[item].name}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;
