define(['d3','service','ui'],function (d3,service,ui){
  'use strict';

  var view = {};
  
  view.drawList = function(id,data){
    var svg = typeof id==='object' ? id : d3.select(id), d, sum = 0;

    for (d in data.dimension){ sum += data.dimension[d]; }

    // type of chart
    svg.append('text')
        .attr('dy', '-2em')
        .style('fill','grey')
        .style('text-anchor', 'middle')
        .text(function(d) { return data.type.toUpperCase(); });

    // header title
    svg.append('text')
        .style('font-size','28px')
        .style('text-anchor', 'middle')
        .text(function(d) { return data.prefix+ui.formatNumber(sum)+data.suffix; });

    var x = 1, y = 0, i = 0, t=1.1, z=2;
    for (d in data.dimension){
      // name
      svg.append('text')
          .attr('dx', x*ui.radius/1.2+'px')
          .attr('dy', y+ui.perimeter+ui.radius+'px')
          .style('fill',ui.getColor(data.type,i))
          .style('text-anchor', 'middle')
          .text(function() { return ui.capitalize(d); });
      // percentage
      svg.append('text')
          .attr('dx', x*ui.radius/z+'px')
          .attr('dy', y+ui.perimeter*3+ui.radius+'px')
          .style('text-anchor', 'left')
          .style('font-weight', 'bold')
          .text(function() { return ui.percentage(data.dimension[d]/(sum)) });
      // total
      svg.append('text')
          .attr('dx', x*ui.radius/t+'px')
          .attr('dy', y+ui.perimeter*3+ui.radius+'px')
          .style('font-size','13px')
          .style('fill','grey')
          .style('text-anchor', 'left')
          .text(function() { return  data.prefix+ui.formatNumber(data.dimension[d])+data.suffix });

      if (++i%2){ x*=-1; z = 1.2; t = 2; }
      else { z = 2; t = 1.1; }
      if (i>1 && i%2===0){ y+=50; }
    }
  }

  view.drawDonut = function(id,data){
    var all = [], d;

    for (d in data.dimension){ all.push(data.dimension[d]); }

    var svg = d3.select(id).append('li').append('svg')
        .attr('width', ui.width)
        .attr('height', ui.height+50*Object.keys(data.dimension).length)
        .append('g').attr('transform', ui.transform);

    var g = svg.selectAll('.arc')
        .data(ui.pie(all))
        .enter().append('g')
        .attr('class', 'arc');

    g.append('path')
        .attr('d', ui.arc)
        .style('fill', function(d,i) { return ui.getColor(data.type,i); });

    view.drawList(svg,data);
  }

  return view;
})