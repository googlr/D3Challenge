var draw = function(xdata, ydata, low, high) {
	d3.selectAll("svg > *").remove();
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
			if(xdata != "mpg" || ydata != "mpg") {
				d["mpg"] = +d["mpg"];
			}
			d[xdata] = +d[xdata];
			d[ydata] = +d[ydata];
		});
		// filter
		data = data.filter(function(d) {
			return d["mpg"] >= low && d["mpg"] <= high;
		});
		// making scale	
		console.log(data.length);
		var scaleX = d3.scaleLinear()
			.range([0, width])
			.domain([d3.min(data, function(d) {
				return d[xdata];
			}) / 1.5, d3.max(data, function(d) {
				return d[xdata];
			})]);

		var scaleY = d3.scaleLinear()
			.range([height, 0])
			.domain([d3.min(data, function(d) {
				return d[ydata];
			}) / 1.5, d3.max(data, function(d) {
				return d[ydata];
			})]);

		// Add the X Axis
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(0," + (height) + ")")
			.call(d3.axisBottom(scaleX).ticks(5));

		// X Axis text
		// text label for the x axis
		svg.append("text")
			.attr("transform",
				"translate(" + (width) + " ," +
				(height + margin.top) + ")")
			.style("text-anchor", "middle")
			.text(xdata);

		// Add the Y Axis
		svg.append("g")
			.attr("class", "axis")
			.call(d3.axisLeft(scaleY));

		// text label for the y axis
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 )
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text(ydata);

		// add points
		svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return scaleX(d[xdata]);
			})
			.attr("cy", function(d) {
				return scaleY(d[ydata]);
			})
			.attr("r", 2);

		// add text

	});

};

$(document).ready(function() {
	draw("displacement", "mpg", 0, 30);
	$('#update').click(function() {
		draw("displacement", "weight", 0, 30);
	});

});