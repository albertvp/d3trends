requirejs.config({
	paths: {
		d3: '//d3js.org/d3.v3.min',
		view: './view',
		service: './service',
		ui: './ui'
	},
	shim: {
		d3: {
			exports: 'd3'
		}
	}
});

require(['service'], function (service) {
	service.load('data/trends.csv');
});