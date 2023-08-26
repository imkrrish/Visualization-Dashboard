import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChartInsightsByRegion = ({ insightsData }) => {
  // Calculate the average values for each region
  const filteredData = insightsData.filter((item) => item.likelihood !== "" && item.relevance !== "" && item.intensity !== "");

  const regionAverages = filteredData.reduce((acc, insight) => {
    const region = insight.region;

    if (region !== "")
      if (!acc[region]) {
        acc[region] = {
          totalLikelihood: insight.likelihood,
          totalRelevance: insight.relevance,
          totalIntensity: insight.intensity,
          count: 1,
        };
      } else {
        acc[region].totalLikelihood += insight.likelihood;
        acc[region].totalRelevance += insight.relevance;
        acc[region].totalIntensity += insight.intensity;
        acc[region].count++;
      }

    return acc;
  }, {});

  // Calculate the average values for each region
  const seriesData = Object.entries(regionAverages).map(([region, data]) => ({
    name: region,
    yLikelihood: data.totalLikelihood / data.count,
    yRelevance: data.totalRelevance / data.count,
    yIntensity: data.totalIntensity / data.count,
  }));

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Column Chart: Insights by Region",
    },
    xAxis: {
      categories: Object.keys(regionAverages),
    },
    yAxis: {
      title: {
        text: "Average Value",
      },
    },
    series: [
      {
        name: "Average Likelihood",
        data: seriesData.map((data) => data.yLikelihood),
      },
      {
        name: "Average Relevance",
        data: seriesData.map((data) => data.yRelevance),
      },
      {
        name: "Average Intensity",
        data: seriesData.map((data) => data.yIntensity),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ColumnChartInsightsByRegion;
