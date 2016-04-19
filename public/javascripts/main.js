$(function() {
    
    $('#pending').on('click', function() {
        console.log('click!')
        $('#jobTip').toggle(300);
    })

    var counter = 0

    $('#addAnother').on('click', function() {
        counter += 1
        var payout = $('#jobPayOut').val()
        console.log(payout)

        $('.shiftData').hide()
        $('#addedJobs').append(
            '<h3> Job 1 </h3>',
                '<li>blah blay</li>',


            '</ul>'
        )
    })
    
})
