/// <reference path="../../interfaces.d.ts" />

import * as d3 from 'd3';

const padding = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

class BrushableBar {

  x: any;
  y: any;
  $container: any;
  $svg: any;
  $content: any;
  $bars: any;

  formatData(data: any) {
    const formattedData: Point[] = [];
    data.x.forEach((_: number, i: number) => {
      formattedData.push({ x: data.x[i], y: data.y[i] });
    });
    return formattedData;
  }

  constructor(selector: string, data = { x: [], y: [] }, options = { width: 600, height: 400 }) {
    const {
      width,
      height
    } = options;

    this.x = d3.scale.linear().domain(d3.extent(data.x)).range([]);
    this.y = d3.scale.linear().domain(d3.extent(data.y)).range([options.height - padding.top - padding.bottom, padding.top]);

    this.$container = d3.select(selector);
    this.$svg = this.$container.append('svg').attr('width', width).attr('height', height);
    this.$content = this.$svg.append('g').attr('transform', `translate(${padding.top}, ${padding.left})`);

    this.$bars = this.$content.selectAll('rect').data(this.formatData(data)).enter().append('rect');
    this.$bars
      .attr('x', (d: Point) => {
        return this.x(d.x)
      })
      .attr('y', (d: Point) => {
        this.y(d.y)
      })
      .attr('width', 10)
      .attr('height', (d: Point) => {
        return this.y(0) - this.y(d.y);
      });
  }
}


export default BrushableBar;