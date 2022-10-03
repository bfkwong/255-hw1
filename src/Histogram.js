import React from "react";
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function HistogramWrapper(props) {
  console.log(props.r);
  return (
    <Bubble
      options={{
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Inflation vs Earnings (Bubble size = Highest Pay - Lowest Pay)"
          }
        }
      }}
      data={{
        datasets: [
          {
            label: "CPI inflation vs Earnings growth",
            data: props?.x?.map?.((item, idx) => ({
              x: props.x[idx],
              y: props.y[idx],
              r: props.r[idx]
            })),
            backgroundColor: "rgba(53, 162, 235, 0.5)"
          }
        ]
      }}
    />
  );
}
