
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('yay!')
  var kittySchema = mongoose.Schema({
     name: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);
  Kitten.findOne({ name: 'Cinamon'}, function(err, cinamon) {
    if (err) return console.error(err)
    console.log(cinamon.name);
  });
});

