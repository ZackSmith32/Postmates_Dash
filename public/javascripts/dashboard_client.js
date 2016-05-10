var numDays = 30
var dateArray = getDates(numDays)
var sampleDay = moment('03/25/2016', 'MM/DD/YYYY')


var jobsByDay = dateArray.map(filterJobs)
var totalByDay = jobsByDay.map(sumJobs)
var chartData = addDate(dateArray, totalByDay)

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
	var total = 0
	if(jobs.length > 0) {	
		for (var i = 0; i<jobs.length; i++) {
			total += jobs[i]['jobTotal']
		}
	}
	else {total = 0}
	var num = total.toFixed(2)
	return Number(num)
}

function addDate(dateArray, dataArray) {
	var makeReady = []

	for (var i = 0; i<dataArray.length; i++) {
		makeReady.push([dateArray[i].format('M/D'), dataArray[i]])
	}
	return makeReady
}


















