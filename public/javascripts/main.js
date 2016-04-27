$(function() {
    // tests
    console.log('main.js')
    var start = moment(jobData['jobStart']).format('h:mm a')
    console.log('this is start ' +start)

    // see function below.  Creates a list of jobs from active shift
    appendJobs(jobData)

    // autocomplete
    var merchantList = [
        'McDonalds',
        '800 Degrees',
        'Tender Greens',
        'Taco Bell',
        'Coco\'s Fresh Juice']
    
    $('#autocomplete-1').autocomplete({
        source: merchantList,
        autoFocus: true
    })



    
    // hide tip field if tip is pending
    $('#pending').on('click', function() {
        $('#jobTip').toggle(300);
    })

    // remove job from list and from database
    $('.job-delete').on('click', function( event ) {
        $target = $(event.target)

        $.ajax({
            type: 'DELETE',
            url: '/addData/',
            data: {_id : $target.attr('jobid')},
            success: function(res) {
                target.parent().parent().remove();
                //$alert.trigger('success', 'Task was removed.');
                },
            error: function(err) {
                //$alert.trigger('error', error);
                console.log(err)
            }
        })
    })   
})


function appendJobs(list) {
    for (var i = 0; i < list.length; i++) {
        jobForList = list[i]
        var date = moment(jobForList['jobStart']).format('dddd MM/YY')
        var start = moment(jobForList['jobStart']).format('h:mm a')
        var end = moment(jobForList['jobEnd']).format('h:mm a')
        console.log(jobForList)

        $('#addedJobs > table > tbody').append("<tr></tr>")
        $('#addedJobs > table > tbody > tr:last-child').append(
            
            "<td>" +date+ "</td>",
            "<td>" +jobForList['jobMerchant']+ "</td>",
            "<td>" +jobForList['jobPayout']+ "</td>",
            "<td>" +jobForList['jobTip']+ "</td>",
            "<td>" +start+ "</td>",
            "<td>" +end+ "</td>",
            "<td><button type='button' class='job-delete' jobID='"+jobForList['_id']+"'> Delete </button></td>"
        )
    }
}