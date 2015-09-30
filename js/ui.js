define(['d3'],function (d3){
	'use strict';
	
	var ui = {};

	ui.width = 300;
	ui.height = 200;
	ui.radius = 100;
	ui.perimeter = 11;
	ui.colors = {
		revenue: ['DarkGreen','LimeGreen'],
		impressions: ['DodgerBlue','DeepSkyBlue'],
		visits: ['GoldenRod','Gold']
	};

	ui.transform = 'translate(' + ui.width / 2 + ',' + ui.height / 2 + ')';

	ui.getColor = function (type,i){
		return ui.colors[type][i];
	};

	ui.arc = d3.svg.arc()
		.outerRadius(ui.radius)
		.innerRadius(ui.radius - ui.perimeter);

	ui.pie = d3.layout.pie().sort(null).value(function (d) { return d; });

	ui.formatNumber = function (x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	ui.percentage = function (num){
		num *= 100;
		return Math.round(num)+'%';
	}

	return ui;
});