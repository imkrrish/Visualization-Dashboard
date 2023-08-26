import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ScatterPlotIntensityRelevance = ({ data }) => {
  // Prepare data for the scatter plot
  const insightsData = data.map((insight) => ({
    x: insight.intensity,
    y: insight.relevance,
    name: insight.title,
  }));

  const options = {
    chart: {
      type: "scatter",
      zoomType: "xy",
    },
    title: {
      text: "Scatter Plot: Intensity vs. Relevance",
    },
    xAxis: {
      title: {
        text: "Intensity",
      },
    },
    yAxis: {
      title: {
        text: "Relevance",
      },
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5, // Adjust marker size
          symbol: "circle",
        },
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              console.log("Clicked on point:", this.name);
              // Add your custom click event logic here
            },
          },
        },
      },
    },
    series: [
      {
        name: "relevance",
        data: insightsData,
      }
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ScatterPlotIntensityRelevance;
