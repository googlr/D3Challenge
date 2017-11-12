// get the data
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
	console.log(dataRow);

	//select value from the page, default
	var sel_x = $("#sel-x").val(), 
		sel_y = $("#sel-y").val();
	var mpg_min = $("#mpg-min").val(), 
		mpg_max = $("#mpg-max").val();

	// Extract the corresponding data from the array
	var xData = [],
		yData = [];
	for( var i=0; i<dataRow; i++){
		xData.push( parseInt( data[i][ sel_x ] ) );
		yData.push( parseInt( data[i][ sel_y ] ) );
	}

	console.log(xData);
	console.log(yData);
	console.log(mpg_min);
	console.log(mpg_max);
    //format data if required...
    //draw chart
    //var parsed = d3.csvParse(data);

	//console.log(parsed);
});