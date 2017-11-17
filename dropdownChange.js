
// Create Event Handlers for mouse
function handleMouseOver(d) { // Add interactivity

	// Use D3 to select element, change color and size
	$("#hovered").html(d["name"]);
}

function handleMouseOut(d, i) {
	// Use D3 to select element, change color back to normal
}

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
		var scaleX = d3.scaleLinear()
			.range([0, width])
			.domain([d3.min(data, function(d) {
				return d[xdata];
			}) / 1.05, d3.max(data, function(d) {
				return d[xdata];
			})]);

		var scaleY = d3.scaleLinear()
			.range([height, 0])
			.domain([d3.min(data, function(d) {
				return d[ydata];
			}) / 1.05, d3.max(data, function(d) {
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
				(height + margin.top- 10) + ")")
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
			.attr("x", 0)
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
			.attr("name", function(d) {
				return d["name"];
			})
			.attr("r", 2)
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut);

		// add text

	});

};

action = function() {
	var sel_x = $("#sel-x").val(),
		sel_y = $("#sel-y").val();
	var mpg_min = $("#mpg-min").val(),
		mpg_max = $("#mpg-max").val();
	draw(sel_x, sel_y, mpg_min, mpg_max);
}

// Draw the chart
$(document).ready(function() {

	$('#update').click(function() {
		action();
	});

	$("#sel-x").change(function() {
		action();
	});

	$("#sel-y").change(function() {
		action();
	});
});

// Hover
$(document).ready(function() {
	action();
	$("hovered").hover(function() {
		$(this).css("background-color", "yellow");
	}, function() {
		$(this).css("background-color", "pink");
	});
});