define(['d3'],function (d3){
	'use strict';
	
	var ui = {
		width: 300,
		height: 200,
		radius: 100,
		perimeter: 11,
		colors: {
			revenue: ['DarkGreen','LimeGreen'],
			impressions: ['DodgerBlue','DeepSkyBlue'],
			visits: ['GoldenRod','Gold']
		},
		capitalize: capitalize
	};

	ui.transform = 'translate(' + ui.width / 2 + ',' + ui.height / 2 + ')';

	ui.getColor = function (type,i){
		return ui.colors[type] ? ui.colors[type][i] : ['black','white'];
	};

	ui.arc = d3.svg.arc()
		.outerRadius(ui.radius)
		.innerRadius(ui.radius - ui.perimeter);

	ui.pie = d3.layout.pie().sort(null).value(function (d) { return d; });

	ui.formatNumber = function (x) {
	    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
	};

	ui.percentage = function (num){
		num *= 100;
		return Math.round(num)+'%';
	}

	function capitalize(s){
		//s[0] = s[0].toUpperCase();
		return s;
	}

	return ui;
});