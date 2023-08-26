import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function IntensityChart({ data }) {
  const svgRef = useRef(null);
  const sectorData = {};

  data.forEach((item) => {
    if (!sectorData[item.sector] && item.sector !== "") {
      sectorData[item.sector] = [];
    }
    if (item.sector !== "") sectorData[item.sector].push(item.intensity);
  });

  console.log(sectorData);

  const averageIntensityPerSector = Object.keys(sectorData).map((sector) => ({
    sector,
    averageIntensity: d3.mean(sectorData[sector]),
  }));

  useEffect(() => {
    // Clear any previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(averageIntensityPerSector.map((d) => d.sector))
      .range([0, width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(averageIntensityPerSector, (d) => d.averageIntensity)])
      .nice()
      .range([height, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll(".bar")
      .data(averageIntensityPerSector)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.sector))
      .attr("y", (d) => yScale(d.averageIntensity))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.averageIntensity))
      .attr("fill", "blue");
    g.selectAll("x").style("color", "red");

    g.append("g").attr("class", "axis").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale));

    g.append("g").attr("class", "axis").call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Intensity Per Sector");
  }, []);

  return (
    <div className="chart">
      <svg ref={svgRef}></svg>;
    </div>
  );
}

export default IntensityChart;
