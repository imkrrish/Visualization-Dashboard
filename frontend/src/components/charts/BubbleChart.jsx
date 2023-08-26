import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more"; // Import the highcharts-more module
import HighchartsExporting from "highcharts/modules/exporting"; // Import the exporting module

// Initialize the necessary modules
HighchartsMore(Highcharts);
HighchartsExporting(Highcharts);

const BubbleChart = ({ data }) => {
  const filteredData = data.filter((item) => item.topic !== "");
  // Process data to prepare series for the bubble chart
  const bubbleChartData = filteredData.map((entry) => ({
    x: entry.intensity,
    y: entry.likelihood,
    z: entry.relevance,
    name: entry.topic,
  }));

  const options = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "Intensity vs. Likelihood vs. Relevance",
    },
    xAxis: {
      title: {
        text: "Intensity",
      },
    },
    yAxis: {
      title: {
        text: "Likelihood",
      },
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
        "<tr><th>Intensity:</th><td>{point.x}</td></tr>" +
        "<tr><th>Likelihood:</th><td>{point.y}</td></tr>" +
        "<tr><th>Relevance:</th><td>{point.z}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },
    series: [
      {
        data: bubbleChartData,
        colorByPoint: true,
        // marker: {
        //   fillColor: "rgba(50, 102, 200, 0.5)",
        // },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BubbleChart;
