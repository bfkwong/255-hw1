import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarGraph(props) {
  const { data } = props;
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: props.title
          }
        }
      }}
      data={{
        labels: data?.profession,
        datasets: [
          {
            label: "Dataset 1",
            data: data?.value,
            backgroundColor: props.color
          }
        ]
      }}
    />
  );
}
