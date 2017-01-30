
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/postmates', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

db.jobs.update(
  {'jobMerchant': 'Bang Na Thai Fusion'},
  {$set: {'jobEnd': new ISODate("2016-05-04T12:16:00Z")}}, 
  false, 
  false

db.jobs.find({'jobMerchant': 'Jack in the Box'}).pretty()









//var johnny = db.users.findOne({email: 'johnny@test.com'})
//db.jobs.update({}, {$set: {userID: zack._id}}, {multi: true})

/*

./bin/mongo ds139277.mlab.com:39277/postmatesdash -u zack_smith -p Killa1kaz

lil bit of code that duplicates all existing data

jobs.find( {}, function(err, job_list) {
    for (var i = 0; i < job_list.length; i++)
    {
        var new_job = new jobs({
            shiftNumber: job_list[i].shiftNumber,
            jobStart: job_list[i].jobStart,
            jobEnd: job_list[i].jobEnd,
            jobLengthHours: job_list[i].jobLengthHours,
            jobMerchant: job_list[i].jobMerchant,
            jobCategory: job_list[i].jobCateory,
            jobPayout: job_list[i].jobPayout,
            jobTip: job_list[i].jobTip,
            jobMultiplier: job_list[i].jobMultiplier,
            jobTipPending: job_list[i].jobTipPending,
            jobTotal: job_list[i].jobTotal,
            jobCancel: job_list[i].jobCancel,
            jobPromotion: job_list[i].jobPromotion,
            updated_at: job_list[i].updated_at,
            created_at: job_list[i].created_at,
            jobTest: job_list[i].jobTest,
            userID: 'z.smith32@gmail.com'
        });
        // console.log('new_job:', new_job);
        console.log('old_job:', job_list[i]);
        new_job.save(function(err, nu) {
            console.log('in save');
            if (err) {
                console.log(err);
                return err
            };
            console.log('new', nu);
        })
    }
    // new_job = job_list[0];
    // console.log(new_job)
    // new_job['userID'] = johnny._id;
})

*/