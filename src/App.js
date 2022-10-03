import React from "react";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

import econDataReadings from "./data/econ_data_reading.json";
import growthRates from "./data/growth_rates.json";
import highestPaying from "./data/highest_paying_profession.json";
import lowestPaying from "./data/lowest_paying_profession.json";
import BarGraph from "./BarGraph";
import HistogramWrapper from "./Histogram";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function processEconDataReading() {
  const { cpi, earning_average, earning_highest, earning_lowest } = econDataReadings;

  const output = {
    dateLabel: [],
    cpi: [],
    avgEarning: [],
    highEarning: [],
    lowEarning: []
  };

  Object.keys(cpi).forEach((dateVal) => {
    output.dateLabel.push(dayjs(parseInt(dateVal)).format("YYYY-MM-DD"));
    output.cpi.push(cpi[dateVal]);
    output.avgEarning.push(earning_average[dateVal]);
    output.highEarning.push(earning_highest[dateVal]);
    output.lowEarning.push(earning_lowest[dateVal]);
  });

  return output;
}

function processGrowthData() {
  const {
    lowest_paying_profession_real_growth,
    highest_paying_profession_nominal_growth,
    lowest_paying_profession_nominal_growth,
    average_pay_real_growth,
    average_pay_nominal_growth,
    cpi_inflation_growth
  } = growthRates;

  const output = {
    dateLabel: [],
    lowestPayReal: [],
    lowestPayNominal: [],
    highestPayNominal: [],
    averagePayReal: [],
    averagePayNominal: [],
    cpiInflation: []
  };

  Object.keys(lowest_paying_profession_real_growth).forEach((dateVal) => {
    output.dateLabel.push(dayjs(parseInt(dateVal)).format("YYYY-MM-DD"));
    output.lowestPayReal.push(lowest_paying_profession_real_growth[dateVal]);
    output.lowestPayNominal.push(lowest_paying_profession_nominal_growth[dateVal]);
    output.highestPayNominal.push(highest_paying_profession_nominal_growth[dateVal]);
    output.averagePayReal.push(average_pay_real_growth[dateVal]);
    output.averagePayNominal.push(average_pay_nominal_growth[dateVal]);
    output.cpiInflation.push(cpi_inflation_growth[dateVal]);
  });

  return output;
}

function processProfessionPay(data) {
  const { profession, value } = data;
  const output = {
    profession: [],
    value: []
  };

  Object.keys(profession).forEach((idx) => {
    output.profession.push(profession[idx]);
    output.value.push(value[idx]);
  });

  return output;
}

function App() {
  const [readingsData, setReadingsData] = React.useState({});
  const [growthData, setGrowthData] = React.useState({});
  const [highestPayingJob, setHighestPayingJob] = React.useState({});
  const [lowestPayingJob, setLowestPayingJob] = React.useState({});

  React.useEffect(() => {
    setReadingsData(processEconDataReading());
    setGrowthData(processGrowthData());
    setHighestPayingJob(processProfessionPay(highestPaying));
    setLowestPayingJob(processProfessionPay(lowestPaying));
  }, []);

  React.useEffect(() => {
    console.log(readingsData, growthData);
  }, [readingsData, growthData]);

  const charts = (
    <div>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Earnings and Inflation Growth Data"
            }
          }
        }}
        data={{
          labels: growthData?.dateLabel,
          datasets: [
            {
              label: "Lowest Paying Nominal Growth",
              data: growthData?.lowestPayNominal,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
              label: "Highest Paying Nominal Growth",
              data: growthData?.highestPayNominal,
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.5)"
            },
            {
              label: "Lowest Paying Real Growth",
              data: growthData?.lowestPayReal,
              borderColor: "rgb(255, 206, 86)",
              backgroundColor: "rgba(255, 206, 86, 0.5)"
            },
            {
              label: "Average Real Growth",
              data: growthData?.averagePayReal,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)"
            },
            {
              label: "Average Nominal Growth",
              data: growthData?.cpiInflation,
              borderColor: "rgb(153, 102, 255)",
              backgroundColor: "rgba(153, 102, 255, 0.5)"
            },
            {
              label: "CPI Inflation",
              data: growthData?.averagePayNominal,
              borderColor: "rgb(255, 159, 64)",
              backgroundColor: "rgba(255, 159, 64, 0.5)"
            }
          ]
        }}
      />
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top"
            },
            title: {
              display: true,
              text: "Earnings and Inflation Growth Data"
            }
          }
        }}
        data={{
          labels: readingsData?.dateLabel,
          datasets: [
            {
              label: "CPI Readings",
              data: readingsData?.cpi,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)"
            },
            {
              label: "Average Hourly Growth",
              data: readingsData?.avgEarning,
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.5)"
            },
            {
              label: "Highest Paying Hourly Wage",
              data: readingsData?.highEarning,
              borderColor: "rgb(255, 206, 86)",
              backgroundColor: "rgba(255, 206, 86, 0.5)"
            },
            {
              label: "Lowest Paying Hourly Wage",
              data: readingsData?.lowEarning,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)"
            }
          ]
        }}
      />
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 30, marginBottom: 0 }}>
      <h2>CMPE255 Homework 1 - Economic Data Dashboard</h2>
      <h4>By: Bryan Kwong</h4>
      <div style={{ width: "100%", maxWidth: 800 }}>
        {charts}
        <BarGraph data={highestPayingJob} title="Highest Paying Professions" color="rgba(255, 99, 132, 0.5)" />
        <BarGraph data={lowestPayingJob} title="Lowest Paying Professions" color="rgba(75, 192, 192, 0.5)" />
        <HistogramWrapper
          x={growthData?.cpiInflation}
          y={growthData?.averagePayNominal}
          r={growthData?.highestPayNominal?.map?.(
            (item, idx) => growthData?.highestPayNominal[idx] - growthData?.lowestPayNominal[idx]
          )}
        />
      </div>
      <p style={{ marginTop: 55, color: "gray" }}>Bryan Kwong {dayjs().format("YYYY")}</p>
    </div>
  );
}

export default App;
