var numDays = 30
var dateArray = getDates(numDays)
var sampleDay = moment('03/25/2016', 'MM/DD/YYYY')


var jobsByDay = dateArray.map(filterJobs)
var totalByDay = jobsByDay.map(sumJobs)
var chartData = addDate(dateArray, totalByDay)

chartData.unshift(['Earnings', 'Payout', 'Tips'])
console.log(chartData)



function getDates (numDays) {
	var endDay = moment()
	var startDay = moment().subtract(numDays, 'days')
	var dateArray = []
	
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
		makeReady.push([dateArray[i].format('M/D'), 
										dataArray[i][0], 
										dataArray[i][1]])
	}
	return makeReady
}


















