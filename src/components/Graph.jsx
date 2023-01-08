import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScoresGraph = ({ attempts, scores }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleLinear()
      .domain([0, attempts.length - 1])
      .range([0, 500]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(scores), d3.max(scores)])
      .range([500, 0]);

    const line = d3.line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));

    svg.selectAll("path")
      .data([scores])
      .join("path")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "blue");

    svg.selectAll("circle")
      .data(scores)
      .join("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 4)
      .attr("fill", "blue");
  }, [attempts, scores]);

  return (
    <svg width={500} height={500} ref={svgRef} />
  );
};

export default ScoresGraph;