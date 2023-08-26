import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChartRegionDistribution = ({ insightsData }) => {
  // Calculate the distribution of regions
  const regionDistribution = insightsData.reduce((acc, insight) => {
    const region = insight.region;

    if (!acc[region]) {
      acc[region] = 1;
    } else {
      acc[region]++;
    }

    return acc;
  }, {});

  // Prepare data for the pie chart
  const seriesData = Object.entries(regionDistribution).map(([region, count]) => ({
    name: region,
    y: count,
  }));

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Pie Chart: Region Distribution",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
          style: {
            fontWeight: "normal",
          },
        },
      },
    },
    series: [
      {
        name: "Regions",
        data: seriesData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChartRegionDistribution;
