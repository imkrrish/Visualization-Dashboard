import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChartSectorDistribution = ({ insightsData }) => {
  // Calculate the distribution of sectors
  const sectorDistribution = insightsData.reduce((acc, insight) => {
    const sector = insight.sector;

    if (!acc[sector]) {
      acc[sector] = 1;
    } else {
      acc[sector]++;
    }

    return acc;
  }, {});

  // Prepare data for the pie chart
  const seriesData = Object.entries(sectorDistribution).map(([sector, count]) => ({
    name: sector,
    y: count,
  }));

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Pie Chart: Sector Distribution",
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
        name: "Sectors",
        data: seriesData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChartSectorDistribution;
