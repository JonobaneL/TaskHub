import { LineChartProps } from "@/models/RareUseTypes";
import Helper from "./Helper";

const LineChart = ({
  params,
  total = 1,
  asChild = false,
  config,
}: LineChartProps) => {
  const options = Object.keys(params)
    .map((key) => {
      const width = (params[key].value / total) * 100;
      return {
        width: width,
        color: params[key].color,
        name: key,
        value: params[key].value,
      };
    })
    .filter((item) => item.width > 0);
  return (
    <div
      className="flex items-center"
      style={
        asChild
          ? { width: "100%", height: "100%" }
          : { width: "15rem", height: "2rem" }
      }
    >
      {options.map((item) => {
        const content = [
          `${item.value}/${total}`,
          config?.width ? `${Math.floor(item.width)}%` : "",
          config?.name ? item.name : "",
        ];
        return (
          <Helper
            side={config?.tooltipAlign || "bottom"}
            key={item.name}
            content={content}
          >
            <div
              key={item.name}
              style={{
                width: `${item.width}%`,
                background: item.color,
                border:
                  item.name == "empty" ? "1px solid rgb(209 213 219)" : "none",
              }}
              className={`group h-full flex items-center justify-center transition-all duration-200 hover:scale-105 `}
            />
          </Helper>
        );
      })}
    </div>
  );
};

export default LineChart;
