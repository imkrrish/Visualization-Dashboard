import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const IntensityByTopicBarChart = ({ data }) => {
  // Extracting unique topics and calculating average intensity for each topic
  const topics = {};
  const filteredData = data.filter((item) => item.intensity !== "");
  filteredData.forEach((entry) => {
    if (!topics[entry.topic]) {
      topics[entry.topic] = {
        totalIntensity: 0,
        count: 0,
      };
    }
    topics[entry.topic].totalIntensity += entry.intensity;
    topics[entry.topic].count++;
  });

  const topicChartData = Object.keys(topics).map((topic) => ({
    name: topic,
    averageIntensity: topics[topic].totalIntensity / topics[topic].count,
  }));

  // Sorting data by average intensity in descending order
  topicChartData.sort((a, b) => b.averageIntensity - a.averageIntensity);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Intensity of Insights by Topic",
    },
    xAxis: {
      categories: topicChartData.map((entry) => entry.name),
    },
    yAxis: {
      title: {
        text: "Average Intensity",
      },
    },
    series: [
      {
        name: "Average Intensity",
        data: topicChartData.map((entry) => entry.averageIntensity),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default IntensityByTopicBarChart;
