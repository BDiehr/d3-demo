import d3 from 'd3';
import moment from 'moment';

function createChart(containerId) {
  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  /** Setup X */
  const xValue = d => d.date;
  const xScale = d3.time.scale()
    .domain([new Date(), moment().add(100, 'days').toDate()])
    .range([0, width]);
  const xMap = d => xScale(xValue(d));
  const xAxis = d3.svg.axis().scale(xScale).orient('bottom');

  /** Setup Y */
  const yValue = d => d.y;
  const yScale = d3.scale.linear()
    .domain([0, 100])
    .range([0, height]);
  const yMap = d => yScale(yValue(d));
  const yAxis = d3.svg.axis().scale(yScale).orient('left');

  /** Create Chart Container */
  const svg = d3.select(`#${containerId}`)
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

  /** X Axis */
  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  /** Y Axis */
  svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  return createPlotUtility({ svg, yMap, xMap });
}

function createPlotUtility({ svg, yMap, xMap }) {
  function plot(data) {
    console.log({ PlotData: data });
    const dots = svg.selectAll('.dot');
    /** Update */
    dots
      .attr('class', 'dot')
      .attr('r', 3.5)
      .attr('cx', xMap)
      .attr('cy', yMap);
    /** Enter */
    dots
      .data(data)
      .enter()
      .append('circle')
        .attr('class', 'dot')
        .attr('r', 3.5)
        .attr('cx', xMap)
        .attr('cy', yMap);
    /** Remove */
    dots
      .data(data)
      .exit()
      .remove();
  }
  return { plot };
}

export default createChart;