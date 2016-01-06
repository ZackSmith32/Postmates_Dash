$(function() {
	










	// filter bar list
	$('#subButton').on('click', function() {
		
		var dayFilterHolder = $('.barDay').map(function() {
				if (this.checked) {
					return $(this).val()}
		}).get();

		if (dayFilterHolder.length === 0) {
			dayFilterHolder = ['mon', 'tues', 'wed', 'thrs', 'fri', 'sat', 'sun', '']
		}

		var areaFilterHolder = $('.barArea').map(function() {
				if (this.checked) {
					return $(this).val()}
		}).get();

		if (areaFilterHolder.length === 0) {
			areaFilterHolder = ['DTLA', 'SM', 'HW', 'CC', '']
		}
		
		var filters = {
			barDayFilters: dayFilterHolder,
			barAreaFilters: areaFilterHolder,
		}
		console.log(filters)
		$.ajax({
			type: 'POST',
			url: '/',
			data: filters,
			success: function(res){
				// the response is a list of objects, so you need to go through the list

				$('.barList > li').remove();
				
				var bar = res
				bar.forEach( function(bar){
					var barName = function() {
						if(bar['barName']) {
							return bar['barName']
						} else {return "No Bar Name"}

					};
					var barArea = bar['barArea'];
					var barHHStart = bar['barHHStart'];
					var barHHEnd = bar['barHHEnd'];
					var barAddress = bar['barAddress'];
					var barDay = bar['barDay'];
					
					$('.barList').append(
						"<li><h3>" +barName()+ "</h3></li>",
							"<ul>",
								"<li>" +barArea+ "</li>",
								"<li>" +barHHStart+ "</li>",
								"<li>" +barHHEnd+ "</li>",
								"<li>" +barDay+ "</li>",
							"</ul>"
					)
					//console.log(bar['barName'])
				})
				// console.log(paresedList);
				// console.log(res['barName']);
				// console.log(res.body)
				// $.each(res, function(index, item) {
				// 	$('.barListTest').append('<li>'+list+'<li>')
				// })
			
			},
			
		})
		//console.log(filters)
	})
})



// need to figure out how to pass all options when nothing
// is selected.  Tried adding a callback to .get(), but it wasn't 
// working.

// futur option would be to create a global object of filters
// then referrence that when necessary


