// Get data from data.js
var tableData = data;

// Create variables and contensts 
var datetime_input = d3.select("#datetime");
var filter_btn = d3.select("#filter-btn");
var ufo_table = d3.select("#ufo-table");
//var viewall_btn = d3.select("#viewall-btn");
var filter_select = d3.select("#filter-select");
populate_ufo_table();

//Console.log the output from data.js
console.log(data);

filter_btn.on("click", function() {
  var filter_option = filter_select.property("value");
  filter_option = filter_option.replace('-option','');

  var filter_option_t = "datetime";
  var keyword = datetime_input.property("value"); //"1/9/2011"
  populate_ufo_table_filter(filter_option,keyword)

});

// viewall_btn.on("click", function() {
// 	//alert("viewall_btn");
// 	populate_ufo_table()
// });	

function populate_ufo_table_filter(filter_option, keyword) {
	clear_table(ufo_table);

	var item_found = false;

	//filter_option = "datetime";
	//keyword = datetime_input.property("value"); //"1/9/2011"

	if (keyword == "") {
		alert("Input Required!")
		return;
	}

	tableData.forEach((UFOlevel) => {
		var row = ufo_table.append("tr").attr("id", "ufo-table-tr");

		var do_print = false;

		Object.entries(UFOlevel).forEach(([key, value]) => {
      		//console.log(key + " " + value);
      		if (key == filter_option && value.includes(keyword) && !do_print) {
      			do_print = true;
      		}	
    	});

    	if (do_print) {
			Object.entries(UFOlevel).forEach(([key, value]) => {
	      		var cell = row.append("td");
	      		cell.text(value);
	      		item_found = true;
	    	});	
	    }

	});	

	if(!item_found) {
		alert("Nothing Found!");
	}
}

function populate_ufo_table() {
	//console.log(d3.keys(tableData[0]));
	clear_table(ufo_table);

	tableData.forEach((UFOlevel) => {
		var row = ufo_table.append("tr").attr("id", "ufo-table-tr");
		Object.entries(UFOlevel).forEach(([key, value]) => {
      		var cell = row.append("td");
      		cell.text(value);
    	});	
	});	
}

function clear_table(table) {
  //var rows = table.rows;
  //var row_count = rows.length;
  //while (--row_count) {
  //  rows[row_count].parentNode.removeChild(rows[row_count]);
  //}
  d3.selectAll("#ufo-table-tr").remove();
}

function filter_select_onchange(select) {
	//alert("filter-select");
	//datetime_input.placeholder = "";
	datetime_input.attr("placeholder", "");
}
