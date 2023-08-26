import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const TopCountriesByInsightCountBarChart = ({ data }) => {
  // Count insights per country
  const countries = {};
  const filteredData = data.filter((item) => item.country !== "");
  filteredData.forEach((entry) => {
    const country = entry.country;
    if (!countries[country]) {
      countries[country] = 0;
    }
    countries[country]++;
  });

  // Convert countries object to an array of objects
  const countryChartData = Object.keys(countries).map((country) => ({
    name: country,
    insightCount: countries[country],
  }));

  // Sort data by insight count in descending order
  countryChartData.sort((a, b) => b.insightCount - a.insightCount);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Top Countries by Insight Count",
    },
    xAxis: {
      categories: countryChartData.map((entry) => entry.name),
    },
    yAxis: {
      title: {
        text: "Insight Count",
      },
    },
    series: [
      {
        name: "Insight Count",
        data: countryChartData.map((entry) => entry.insightCount),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TopCountriesByInsightCountBarChart;
