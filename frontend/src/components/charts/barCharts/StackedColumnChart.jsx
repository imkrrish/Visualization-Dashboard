import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const StackedColumnChart = ({ data }) => {
  const filteredData = data.filter((item) => item.sector !== "" && item.region !== "");

  // Create data structures to hold counts for each sector and region
  const sectors = Array.from(new Set(filteredData.map((item) => item.sector)));
  const regions = Array.from(new Set(filteredData.map((item) => item.region)));

  const seriesData = sectors.map((sector) => ({
    name: sector,
    data: regions.map((region) => {
      return data.filter((item) => item.sector === sector && item.region === region).length;
    }),
  }));

  const options = {
    chart: {
      type: "column",
    },
    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },
    title: {
      text: "Insights by Sector and Region",
    },
    xAxis: {
      categories: regions,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Count of Insights",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "gray",
        },
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    legend: {
      align: "right",
      verticalAlign: "bottom",
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series: seriesData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StackedColumnChart;
