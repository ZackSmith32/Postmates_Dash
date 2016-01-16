$(function() {

	// funciton for loading list of bars
	var listPopulate = function(list) {
		for (var i = 0; i < list.length; i++) {
			barForIndex = list[i]
			//console.log(barForIndex)
			
			$('.barDetail').append(
				"<li><h3>" +barForIndex['barName']+ "</h3></li>",
					"<ul>",
						"<li>" +barForIndex['barDay']+ "</li>",
						"<li>" +barForIndex['barArea']+ "</li>",
						"<li>" +barForIndex['barHHStart']+ "</li>",
						"<li>" +barForIndex['barHHEnd']+ "</li>",
						
					"</ul>"
		)}
	}

	listPopulate(barData);

});