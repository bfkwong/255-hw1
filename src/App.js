import React from "react";
import "./App.css";
import econDataReadings from "./data/econ_data_reading.json";
import growthRates from "./data/growth_rates.json";

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
    output.dateLabel.push(dateVal);
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
    output.dateLabel.push(dateVal);
    output.lowestPayReal.push(lowest_paying_profession_real_growth[dateVal]);
    output.lowestPayNominal.push(lowest_paying_profession_nominal_growth[dateVal]);
    output.highestPayNominal.push(highest_paying_profession_nominal_growth[dateVal]);
    output.averagePayReal.push(average_pay_real_growth[dateVal]);
    output.averagePayNominal.push(average_pay_nominal_growth[dateVal]);
    output.cpiInflation.push(cpi_inflation_growth[dateVal]);
  });

  return output;
}

function App() {
  const [readingsData, setReadingsData] = React.useState({});
  const [growthData, setGrowthData] = React.useState({});

  React.useEffect(() => {
    setReadingsData(processEconDataReading());
    setGrowthData(processGrowthData());
  }, []);

  React.useEffect(() => {
    console.log(readingsData, growthData);
  }, [readingsData, growthData]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
