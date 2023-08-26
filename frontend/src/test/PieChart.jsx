import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChartWithAverageIntensity = ({ newdata }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const filteredData = newdata.filter((item) => item.sector !== "");
    // Fetch data from the InsightModel (adjust the query as needed)
    async function fetchData() {
      try {
        // Calculate the average intensity for each sector
        const sectorMap = new Map();
        const sectorCountMap = new Map();

        newdata.forEach((item) => {
          if (sectorMap.has(item.sector)) {
            sectorMap.set(item.sector, sectorMap.get(item.sector) + item.intensity);
            sectorCountMap.set(item.sector, sectorCountMap.get(item.sector) + 1);
          } else {
            sectorMap.set(item.sector, item.intensity);
            sectorCountMap.set(item.sector, 1);
          }
        });

        const averageData = Array.from(sectorMap.entries()).map(([sector, intensitySum]) => ({
          name: sector,
          y: intensitySum / sectorCountMap.get(sector), // Calculate average intensity
        }));

        setData(averageData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  console.log(data);

  const chartOptions = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Average Intensity by Sector",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Sectors",
        colorByPoint: true,
        data: data,
      },
    ],
  };

  return (
    <div>
      {/* <div id="container"></div> */}
      <HighchartsReact style={{ height: "100%", width: "100%" }} highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default PieChartWithAverageIntensity;
