
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