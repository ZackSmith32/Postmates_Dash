var express = require('express');
var router = express.Router();
var fs = require('fs');


// ok, so here is how the router.post communicates with the html
// when the button is pushed the html sends a .post event (is that 
// what it's called?) with a /add action to the app.js file.  App.js sees that looks
// for the "app.use" that is associated with that action, then 
// directs it to the right route based on the second variable in use
// which is defined as the file path for the route.

// second thing to note.  Once you are in a route, / is equivalent
// to the route that you are in.  so if I'm looking at the /add
// route, then within that route add is assumed to be before the
// slash, makes sense.. see right below for example

router.post('/', function(req, res) {
  console.log('got to add')
  var newBar = {
  	barName: req.body.newBarName

  }
  fs.writeFile( 'bars.json', JSON.stringify(newBar), "utf8", function(err){
  	if (err) throw err;
  	console.log('bar list updated')
  })

  res.redirect('/')
});

module.exports = router;