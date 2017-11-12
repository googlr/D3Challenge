// Read the data
d3.csv("http://0.0.0.0:8000/car.csv", function(error, data){
  		if (error) throw error;
		console.log(data[0]);

		// Check the data
		var properties = ["name",
					"mpg",
					"cylinders",
					"displacement",
					"horsepower",
					"weight",
					"acceleration",
					"model.year",
					"origin"];
		//
dataRow = data.length;
//console.log(dataRow);

//select value from the page, default
/*
var sel_x = $("#sel-x").val(), 
	sel_y = $("#sel-y").val();
var mpg_min = $("#mpg-min").val(), 
	mpg_max = $("#mpg-max").val();
alert("sel-x: " + sel_x 
	+ " sel-y: " + sel_y 
	+ "   mpg_min: " + mpg_min 
	+ " mpg_max: " + mpg_max );
*/
// Extract the corresponding data from the array
/*
var xData = [],
	yData = [];
for( var i=0; i<dataRow; i++){
	xData.push( parseInt( data[i][ sel_x ] ) );
	yData.push( parseInt( data[i][ sel_y ] ) );
}
console.log(xData);
*/
//console.log(yData);
//console.log(mpg_min);
//console.log(mpg_max);
  

});

// Create Event Handlers for mouse
      function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            console.log( d3.select(this) );
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
			.attr("r", 2)
			.on("mouseover", handleMouseOver)
          	.on("mouseout", handleMouseOut);

		// add text

	});

};


action = function(){
	// Call Draw
        var sel_x = $("#sel-x").val(), 
			sel_y = $("#sel-y").val();
		var mpg_min = $("#mpg-min").val(), 
			mpg_max = $("#mpg-max").val();
		alert("sel-x: " + sel_x 
			+ " sel-y: " + sel_y 
			+ "   mpg_min: " + mpg_min 
			+ " mpg_max: " + mpg_max );
		draw( sel_x, sel_y, mpg_min, mpg_max );
}

// Draw the chart
$(document).ready(function() {
	//draw("displacement", "mpg", 0, 30);
	//draw( sel_x, sel_y, mpg_min, mpg_max );
	$('#update').click(function() {
		//draw("displacement", "weight", 0, 30);
		action();
		//draw( sel_x, sel_y, mpg_min, mpg_max );
	});

	$("#sel-x").change(function() {
        //alert( $('option:selected', this).text() );
        // Call Draw
        action();
    });

    $("#sel-y").change(function() {
        //alert( $('option:selected', this).text() );
        action();
    });
});

// Hover
$(document).ready(function(){
    $("hovered").hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "pink");
    });
});