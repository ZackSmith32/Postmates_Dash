$(function() {
	
	$('#addBar').on('click', function(){
		
		// these are the functions to extract data from the form
		// inputs are different so specific extraction seemed necessary
		var dayHolder = $('.barDay').children().map(function() {
				if (this.checked) {
					return $(this).val()}
			}).get();

		var starHolder = $('.stars').children().map(function() {
				if (this.checked) {
					return $(this).val()}
			}).get();


		var bar = {
			barName: $( ".barName#text" ).val(),
			barAddress: $( ".barAddress#text" ).val(),
			barArea: $( ".barArea#selector" ).val(),
			barDay: dayHolder,
			barHHStart: $( ".barHHStart" ).val(),
			barHHEnd: $( ".barHHEnd" ).val(),
			barStar: starHolder,
			barReview: $( ".barReview" ).val(),
		}
		console.log(bar['barStar']);
		console.log(bar)
		$.ajax({
			type: 'POST',
			url: '/barData',
			data: bar,
			success: function() {
				console.log('bar added')
			}
		})
	

	})
});

