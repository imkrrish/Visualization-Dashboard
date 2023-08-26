import React, { useEffect } from "react";
import Highcharts from "highcharts";

const HighchartsComponent = ({ data }) => {
  useEffect(() => {
    // Convert data to the format expected by Highcharts
    const filteredData = data.filter((item) => item.sector !== "");
    const seriesData = filteredData.map((item) => ({
      name: item.sector,
      y: item.intensity,
    }));

    // Create the chart
    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Intensity by Sector",
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Intensity",
        },
      },
      series: [
        {
          name: "Intensity",
          colorByPoint: true,
          data: seriesData,
        },
      ],
    });
  }, [data]);

  return <div style={{ height: "100%", width: "100%" }} id="container"></div>;
};

export default HighchartsComponent;
