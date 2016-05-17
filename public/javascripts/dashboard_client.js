
// ___________ data parsing ____________

var firstDay = allJobs[0]['jobStart']

// parse JSON data for chart
//var dateArray = getDates(firstDay)
var dateArray = assessDates(allJobs)
var jobsByDay = dateArray.map(filterJobs)
var totalByDay = jobsByDay.map(sumJobs)
var chartData = addDate(dateArray, totalByDay)
chartData.unshift(['Date', 'Payout', 'Tips'])
console.log(chartData)

// functions for parsing data for chart

function assessDates(allJobs) {
	var activeDate = []
	var uniqueActiveDate = []
	for(var i = 0; i<allJobs.length; i++) {
		activeDate.push(moment(allJobs[i]['jobStart'], 'YYYY-MM-DD'))
	}
	var truth = activeDate[0] == activeDate[1]
	console.log('truth ' + activeDate[0] + activeDate[1] + truth)

	for(var j = 0; j < activeDate.length-1 ; j++) {
		if(+activeDate[j] !== +activeDate[j-1]) {
			uniqueActiveDate.push(activeDate[j])
		}
	}
	console.log('active date ' + uniqueActiveDate)
	return uniqueActiveDate
}

function filterJobs(day) {
	return allJobs.filter(function(job) {
		if(day.isSame(job.jobStart, 'day')){
			return job
		}
	})
}

function sumJobs(jobs) {
	var payoutTotal = 0
	var tipTotal = 0
	//this if can probably be taken out
	if(jobs.length > 0) {	
		for (var i = 0; i<jobs.length; i++) {
			payoutTotal += jobs[i]['jobPayout']
			tipTotal += jobs[i]['jobTip']
		}
	}
	else {tipTotal = 0; payoutTotal = 0}
	rPay = Math.round(payoutTotal*100) / 100
	rTip = Math.round(tipTotal*100) / 100
	return [rPay, rTip]
}

function addDate(dateArray, dataArray) {
	var makeReady = []

	for (var i = 0; i<dataArray.length; i++) {
		makeReady.push([new Date(dateArray[i].format('YYYY,MM,DD')), 
										dataArray[i][0], 
										dataArray[i][1]])
	}
	return makeReady
}


// ______________ load google charts __________________

google.charts.load('current', {'packages':['corechart', 'controls']});
  google.charts.setOnLoadCallback(drawStuff);
  google.charts.setOnLoadCallback(drawMerchantChart);

function drawStuff() {

  var dashboard = new google.visualization.Dashboard(
    document.getElementById('dash_div'));

  // We omit "var" so that programmaticSlider is visible to changeRange.
  totalSlider = new google.visualization.ControlWrapper({
    'controlType': 'DateRangeFilter',
    'containerId': 'container_div',
    'options': {
      'filterColumnLabel': 'Date',
      'ui': {'labelStacking': 'vertical'}
    }
  });

  totalChart  = new google.visualization.ChartWrapper({
    'chartType': 'ColumnChart',
    'containerId': 'chart_div',
    'options': {
      'width': 900,
      'height': 300,
      'isStacked': true,
      'hAxis': {
      	'format': 'M/d',
      	'girdLines': {'count': 10}
      },
      'chartArea': {'left': 50, 'top': 50, 'right': 125, 'bottom': 25}
      //'pieSliceText': 'value'
  	}
	});

  var data = google.visualization.arrayToDataTable( chartData);

  dashboard.bind(totalSlider, totalChart);
  dashboard.draw(data);
}



// ___________ merchant chart ____________


function merchantData(allJobs) {
	var merchantData = []
	for (var i = 0; i < allJobs.length - 1; i++) {
		merchantData.push([
			allJobs[i]['jobMerchant'],
			allJobs[i]['jobTotal'],
			allJobs[i]['jobPayout'],
			allJobs[i]['jobTip'],
		])	
	}
	merchantData.unshift(['Merchant', 'Total', 'Payout', 'Tips'])
	return merchantData
}


var merchantData = merchantData(allJobs)


// ______________ load google chart __________________

//google.charts.load('current', {'packages':['corechart', 'controls']});
//  google.charts.setOnLoadCallback(drawStuff);

function drawMerchantChart() {
	
  var merchantDash = new google.visualization.Dashboard(
    document.getElementById('merchant_viz'));

  //We omit "var" so that programmaticSlider is visible to changeRange.
  merchantSelect = new google.visualization.ControlWrapper({
    'controlType': 'CategoryFilter',
    'containerId': 'merchant_control',
    'options': {
      'filterColumnLabel': 'Merchant',
      'ui': {'labelStacking': 'vertical'}
    }
  });

  merchantChart  = new google.visualization.ChartWrapper({
    'chartType': 'BarChart',
    'containerId': 'merchant_chart',
    'options': {
      'width': 900,
      'height': 800,
      //'isStacked': true,
      },
    'chartArea': {'left': 50, 'top': 15, 'right': 125, 'bottom': 25}
	});

  var data = google.visualization.arrayToDataTable( merchantData);
  data.addColumn('number', 'Count')
  var groupedData = google.visualization.data.group( data, [0], 
  	[
	  	{'column': 1,
	  	'aggregation': google.visualization.data.avg,
	  	'type': 'number',
	  	'label': 'Average Earnings'},
	  	{'column': 2,
	  	'aggregation': google.visualization.data.avg,
	  	'type': 'number',
	  	'label': 'Average Payout'},
	  	{'column': 3,
	  	'aggregation': google.visualization.data.avg,
	  	'type': 'number',
	  	'label': 'Average Tips'},
	  	{'column': 4,
	  	'aggregation': google.visualization.data.count,
	  	'type': 'number',
	  	'label': 'Number of Jobs'},
  	])
  groupedData.sort({column: 1, desc: true})
  view = new google.visualization.DataView(groupedData)
  view.setColumns([0, 1])
  view.setRows(0, 25)

  merchantDash.bind(merchantSelect, merchantChart );
  merchantDash.draw(view);

  var buttons = $('.button')

  buttons.on('click', function(){
  	var viewRows = [0]
		$('input:checked').map(function(elem) {
			viewRows.push(Number($(this).val()))
		})
  	changeCols(viewRows)
  })
  // for futur reference:
  // this function redraws the chart with new options
  // the sort is applied to the underlying data for the chart
  // and the columns showing are controlled by the view
  // both of these attributes were set up originally
  // this function modifies them then redraws the chart
  function changeCols(cols) {
  	console.log(cols)
  	if(cols.length<2) {cols = [0, 1]}
  	groupedData.sort({column: cols[1], desc: true})
  	view.setColumns(cols)
  	merchantDash.draw(view)
  }

}




// $(function() {
// 	$('.view_select').on('click', changeOptions() ) //{
// 	// 	console.log(e.currentTarget.id)
// 	// 	merchantChart.setOption('is3D', true)
// 	// 	merchantChart.draw()
// 	// 	//view.setColumns([0, 1, 2])
// 	// })
// })

// function changeOptions() {
//   merchantChart.setOption('is3D', true);
//   merchantChart.draw();
// }
































































// ___________ old functions ____________

// function getDates (firstDay) {
// 	var endDay = moment()
// 	var startDay = moment(firstDay)
// 	var dateArray = []
	
// 	// need to add a filter for if first shift is in this day, then all
// 	// jobs from that shift are on this day... maybee
// 	while (startDay < endDay) {
// 		dateArray.push(moment(startDay))
// 		startDay = startDay.add(1, 'd')
// 	}
// 	return dateArray
// }






