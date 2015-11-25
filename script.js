
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  
  var kittySchema = mongoose.Schema({
    name: String
  });

  

  kittySchema.methods.speak = function () {
  
  console.log('made it!');
  }

  var Kitten = mongoose.model('Kitten', kittySchema);
  
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name);

  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak();

  Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

});

