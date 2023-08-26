import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackedBarChartPestleAnalysis = ({ data }) => {
  // Filter out data with missing or empty values
  const filteredData = data.filter((item) => item.pestle && item.relevance);

  // Get unique Pestle factors and relevance levels
  const pestleFactors = [...new Set(filteredData.map((item) => item.pestle))];
  const relevanceLevels = [...new Set(filteredData.map((item) => item.relevance))];
//   const relevanceLevels = ["High", "Medium", "Low"];

  // Create data structure for series
  const seriesData = pestleFactors.map((pestle) => ({
    name: pestle,
    data: relevanceLevels.map((relevance) => {
      return filteredData.filter((item) => item.pestle === pestle && item.relevance === relevance).length;
    }),
  }));

  const options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Stacked Bar Chart - Pestle Analysis",
    },
    xAxis: {
      categories: pestleFactors,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Count of Insights",
      },
    },
    legend: {
      align: "right",
      verticalAlign: "top",
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: seriesData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StackedBarChartPestleAnalysis;
