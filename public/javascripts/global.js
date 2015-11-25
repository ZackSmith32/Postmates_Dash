// things I need to do
// 1. get the script in here to run when the app loads

// 2. use jquery to filter the bar list (hopefully w/o
// refreshing the page)

// 2b. refer to the two right most open tabs.  use a selector
// to select all the check boxes, then use map to apply
// a function to each of the checked boxes




// this is the jQuery/Ajax for adding a new bar to
// the data base.  It sends all the new info from
// the bar add page to the back end barData page

$(function() {
	console.log('global')
	$('#addBar').on('click', function(){
		var bar = {
			barName: $( "input[name='barName']" ).val(),
			barArea: $( "input[name='barArea']" ).val(),
			barAddress: $( "input[name='barAddress']" ).val(),
			barDay: $( "input[name='barDay']" ).val(),
			barHHStart: $( "input[name='barHHStart']" ).val(),
			barHHEnd: $( "input[name='barHHEnd']" ).val(),
			barStar: $( "input[name='barStar']" ).val(),
			barReview: $( "input[name='barReview']" ).val(),
		}
		console.log(bar);
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

// this was an attempt to embed JSON data in the DOM
// and then use it in this (server side js), I'm going
// to pass on this solution for the moment.  Though if I 
// could get it to work I could use the jquery to fill out
// the bar list on load and after filtering...
// http://stackoverflow.com/questions/10919650/accessing-express-js-local-variables-in-client-side-javascript
//
// $(function() {
// 	console.log($(barData))
// })


// this function will filter the list of bars on index page
$(function(){
  // console.log($('#barList'))
  $( "#subButton" ).on('click', function() {

  	// object to hold filter values
  	var barFilterObj = {
			barName: [],
			barArea: [],
			barAddress: [],
			barDay: [],
			barHHStart:	[],
			barHHEnd: [],
			barStar: [],
			barReview: "",
		}

		// add filter selections to object
  	$( ":checkbox:checked" ).each(function(i){
  		barFilterObj[$(this).attr('class')].push($(this).val())
  	});
  	
  	// count number of filter categories that user selects
  	// bar must have match in this number of fields
  	
  	// select bars w/ same data-num attribute, and go through each one
  	console.log($('.barListElement:last').attr('data-num')) // lil check
  	for (var i = 0; i < $('.barListElement:last').attr('data-num'); i++) {
  		
  		// set up array to store filter outcome...
  		var filterOutcome = []

  		//select all bar attributes
  		$('.barListElement[data-num='+i+']').each(function( index, item) {
  			// j will count the number of filters the bar matches with,
  			// in order to be included this must eaqual the number of 
  			// non null barFilterObj properties
  			console.log($(this).val())
  			console.log(item)
  			var j = 0
  			if (barFilterObj["'"+$(this).attr('name')+"'"]) {
  				
  			} else if ($.inArray( $(this).val(), barFilterObj[$(this).attr('name')]) > -1) {
  				j++
  			} 
  			filterOutcome.push(j);

  			if ( i = $('.barListElement:last').attr('data-num')) {
  				return filterOutcome
  			}
  		})
  		console.log(filterOutcome)
  		
  		// compare the bar attributes to corresponding filter object, exit if obj is empty
  		//for (element in barElements) {
  			//console.log(element)
  			//if (barFilterObj[element.attr(name)] is null) {
  			//	console.log('so far so good')
  			//}
  		//}
  	}



  	// checks
  	// console.log(barFilterObj);
  	// console.log($('.barList'))

  	/* loop through all bars and see if they meet criteria
  	this works but changing approach
  	$('ul.barList > li[data-num').each(function(i, barAttrib) {
  		
  		for each ( item in barFilterObj ) {

  		}
  		for each (var barAttrib in thisBar)
  		thisBar.forEach(function(i, barAttrib) {
  			console.log(barAttrib) //().attr('name'));
  			console.log($(this).attr('data-num'));
  		});

  	}); */

  	/* writing out ideas
  	for each bar 
	  	if list of bar names. children[name = name of filter] inarray filters
	  		then show list of bar names.childre[...].parent
	  */
	

	  // an attempt at filtering...
  	// $( "#barList" ).each(function(i, filters) {
  	// 	console.log($(this).barName + 'checking each')
  	// 	if ($.inArray($(this).val(), filters)) {
  	// 		console.log('in if')
  	// 		console.log($(this));
  	// 	}
  	// })
  	
  	// console.log('working on applying filters')
  	// console.log(filters);

  });
})

// functions


// hide selected checkboxes
// $("input:checkbox").on('change', function() {
  //   var boxToHide = $(this).attr('name');
  //   console.log(boxToHide)
  //   $('label[name=' + boxToHide + ']').hide(2000)      
  // })


//Ideas////////////////////////////////////////////////////

// 3. get the app to update as boxes are checked, this
// might be easy cause in map we are applying a funciton
// to each of the checked boxes, so maybe that function 
// can hide elements

// 4. I should also get the list of all bars available
// so that I do not have to ping the server

// 5. create an object constructor for bars

