$(function() {
	
	$('#addBar').on('click', function(event){
		event.preventDefault();
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
			barReview: $( "textarea.barReview" ).val(),
			barLink: $( ".barName#text" ).val().split(' ').join('_'),
		}

		console.log(bar)
		$.ajax({
			type: 'POST',
			url: '/barData',
			data: bar,
			traditional: true,
			success: function(res) {
				console.log('bar added')
				$("form.barForm")[0].reset()
			}
		})
	

	})
});
// note: use traditional in the ajax method to stop the method
// from appending [] to the end of variable names that are lists

