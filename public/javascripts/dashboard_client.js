
// ___________ data parsing ____________

var firstDay = allJobs[0]['jobStart']

// parse JSON data for chart
var dateArray = getDates(firstDay)
var jobsByDay = dateArray.map(filterJobs)
var totalByDay = jobsByDay.map(sumJobs)
var chartData = addDate(dateArray, totalByDay)
chartData.unshift(['Date', 'Payout', 'Tips'])
console.log(chartData)

// functions for parsing data for chart

function getDates (firstDay) {
	var endDay = moment()
	var startDay = moment(firstDay)
	var dateArray = []
	
	// need to add a filter for if first shift is in this day, then all
	// jobs from that shift are on this day... maybee
	while (startDay < endDay) {
		dateArray.push(moment(startDay))
		startDay = startDay.add(1, 'd')
	}
	return dateArray
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


// ______________ load google chart __________________

google.charts.load('current', {'packages':['corechart', 'controls']});
  google.charts.setOnLoadCallback(drawStuff);

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












