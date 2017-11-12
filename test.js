var draw = function() {

	var margin = {
			top: 50,
			right: 50,
			bottom: 50,
			left: 50
		},
		width = 500 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// create svg
	var svg = d3.select("svg")
		// set svg width and height
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	var data = d3.csv("car.csv", function(error, data) {
		if(error) throw error;

		// format the data
		data.forEach(function(d) {
			d.mpg = + d.mpg;
			d.displacement = +d.displacement;
		});

		console.log(d3.min(data, function(d) {
			return d.mpg;
		}));
		console.log(d3.max(data, function(d) {
			return d.mpg;
		}));
		// making scale		
		var scaleX = d3.scaleLinear()
			.range([0, width])
			.domain([d3.min(data, function(d) {
				return d.displacement;
			}), d3.max(data, function(d) {
				return d.displacement;
			})]);

		var scaleY = d3.scaleLinear()
			.range([height, 0])
			.domain([d3.min(data, function(d) {
				return d.mpg;
			}), d3.max(data, function(d) {
				return d.mpg;
			})]);

		// Add the X Axis
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (height) + ")")
			.call(d3.axisBottom(scaleX).ticks(5));

		// Add the Y Axis
		svg.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(scaleY));

		// add points
		svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return scaleX(d.displacement);
			})
			.attr("cy", function(d) {
				return scaleY(d.mpg);
			})
			.attr("r", 2);

	});

};

$(document).ready(function() {

	draw();
});