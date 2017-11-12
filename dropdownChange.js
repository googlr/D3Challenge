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