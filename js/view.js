define(['d3','service','ui'],function (d3,service,ui){
	'use strict';

	var view = {};
	
	view.drawDonut = function(id,data){
		var svg = d3.select(id).append('li').append('svg')
				.attr('width', ui.width)
				.attr('height', ui.height+50)
				.append('g')
				.attr('transform', ui.transform);

		var g = svg.selectAll('.arc')
				.data(ui.pie([data.smartphone,data.tablet]))
				.enter().append('g')
				.attr('class', 'arc');

		g.append('path')
				.attr('d', ui.arc)
				.style('fill', function(d,i) { return ui.getColor(data.type,i); });

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
				.text(function(d) { return data.prefix+ui.formatNumber(data.smartphone+data.tablet)+data.suffix; });

		// Smartphone
		svg.append('text')
				.attr('dx', ui.radius/1.2+'px')
				.attr('dy', ui.perimeter+ui.radius+'px')
				.style('fill',ui.getColor(data.type,0))
				.style('text-anchor', 'middle')
				.text(function(d) { return 'Smartphone' });
		// Smartphone percentage
		svg.append('text')
				.attr('dx', ui.radius/2+'px')
				.attr('dy', ui.perimeter*3+ui.radius+'px')
				.style('text-anchor', 'left')
				.style('font-weight', 'bold')
				.text(function(d) { return ui.percentage(data.smartphone/(data.smartphone+data.tablet)) });
		// Smartphone total
		svg.append('text')
				.attr('dx', ui.radius/1.1+'px')
				.attr('dy', ui.perimeter*3+ui.radius+'px')
				.style('font-size','13px')
				.style('fill','grey')
				.style('text-anchor', 'left')
				.text(function(d) { return  data.prefix+ui.formatNumber(data.smartphone)+data.suffix });

		// Tablet
		svg.append('text')
				.attr('dx',-ui.radius/1.2+'px')
				.attr('dy', ui.perimeter+ui.radius+'px')
				.style('fill',ui.getColor(data.type,1))
				.style('text-anchor', 'left')
				.text(function(d) { return 'Tablet' });
		// Tablet percentage
		svg.append('text')
				.attr('dx',-ui.radius/1.2+'px')
				.attr('dy', ui.perimeter*3+ui.radius+'px')
				.style('text-anchor', 'left')
				.style('font-weight', 'bold')
				.text(function(d) { return ui.percentage(data.tablet/(data.smartphone+data.tablet)) });
		// Tablet total
		svg.append('text')
				.attr('dx',-ui.radius/2+'px')
				.attr('dy', ui.perimeter*3+ui.radius+'px')
				.style('font-size','13px')
				.style('fill','grey')
				.style('text-anchor', 'left')
				.text(function(d) { return  data.prefix+ui.formatNumber(data.tablet)+data.suffix });
	}

	return view;
})