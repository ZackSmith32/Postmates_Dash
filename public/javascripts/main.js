$(function() {
    console.log('main.js')
    appendJobs(jobData)

    // var start = moment(jobData['jobStart']).format('h:mm a')
    // console.log('this is start' +start)

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
        console.log(jobForList)
        $('#addedJobs > table > tbody').append("<tr></tr>")
        $('#addedJobs > table > tbody > tr:last-child').append(
            
            "<td>" +jobForList['jobMerchant']+ "</td>",
            "<td>" +jobForList['jobPayout']+ "</td>",
            "<td>" +jobForList['jobTip']+ "</td>",
            "<td>" +jobForList['jobStart']+ "</td>",
            "<td>" +jobForList['jobEnd']+ "</td>",
            "<td><button type='button' class='job-delete' jobID='"+jobForList['_id']+"'> Delete </button></td>"
        )
    }
}