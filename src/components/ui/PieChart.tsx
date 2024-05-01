import { DynamicKeyObject } from "@/models/RareUseTypes";
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartLegend from "./ChartLegend";

ChartJS.register(ArcElement, Tooltip);

type ChartProps = {
  params: DynamicKeyObject;
  borderColor?: string;
  width?: string;
  legend?: "left" | "right" | "top" | "bottom";
};

const PieChart = ({
  params,
  borderColor = "white",
  width = "10rem",
  legend = "left",
}: ChartProps) => {
  const [keys, setKeys] = useState(Object.keys(params));
  const totalValue = keys.reduce((prev, item) => prev + params[item].value, 0);
  const data = {
    labels: keys,
    datasets: [
      {
        data: keys.map((item) => params[item].value),
        backgroundColor: keys.map((item) => params[item].color),
        borderColor: keys.map(() => borderColor),
        borderWidth: 1,
      },
    ],
  };
  const styles = {
    left: "",
    right: "flex-row-reverse",
    top: "flex-col",
    bottom: "flex-col-reverse",
  };
  const chartConfig = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        displayColors: false,
        backgroundColor: "#557df6",
        callbacks: {
          title: () => "",
          label(tooltipItem) {
            const key = tooltipItem.label;
            return `${params[key].value}/${totalValue} ${key}`;
          },
        },
      },
    },
  } as ChartOptions<"pie">;
  return (
    <div className={`flex gap-4 ${styles[legend]}`}>
      <ChartLegend
        params={params}
        keys={keys}
        onChange={setKeys}
        align={legend}
      />
      <div style={{ width: width }}>
        <Pie data={data} options={chartConfig} />
      </div>
    </div>
  );
};

export default PieChart;
