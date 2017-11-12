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
	dataLength = data.length;
	console.log(dataLength);
    //format data if required...
    //draw chart
    //var parsed = d3.csvParse(data);

	//console.log(parsed);
});