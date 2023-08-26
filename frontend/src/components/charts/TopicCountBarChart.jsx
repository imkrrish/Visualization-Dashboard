import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const TopTopicsByInsightCountBarChart = ({ data }) => {
  // Count insights per topic
  const topics = {};

  const filteredData = data.filter((item) => item.topic !== "");
  filteredData.forEach((entry) => {
    const topic = entry.topic;
    if (!topics[topic]) {
      topics[topic] = 0;
    }
    topics[topic]++;
  });

  // Convert topics object to an array of objects
  const topicChartData = Object.keys(topics).map((topic) => ({
    name: topic,
    insightCount: topics[topic],
  }));

  // Sort data by insight count in descending order
  topicChartData.sort((a, b) => b.insightCount - a.insightCount);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Top Topics by Insight Count",
    },
    xAxis: {
      categories: topicChartData.map((entry) => entry.name),
    },
    yAxis: {
      title: {
        text: "Insight Count",
      },
    },
    series: [
      {
        name: "Insight Count",
        data: topicChartData.map((entry) => entry.insightCount),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TopTopicsByInsightCountBarChart;
