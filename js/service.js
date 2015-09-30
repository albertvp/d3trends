define(['d3','view'],function (d3,view){
	'use strict';

	var service = {};

	service.load = function (file){
		var ext = file.split('.').pop();
		if (typeof d3[ext]!=='function'){ ext = 'json'; }

		d3[ext](file, function (error, data) {
			if (error || !data){ return alert('Error loading '+file+' with '+ext+' extension'); }
			data.forEach(function (d) {
				d.tablet = +d.tablet;
				d.smartphone = +d.smartphone;
				view.drawDonut('.charts',d);
			});
		});
	}

	return service;
});