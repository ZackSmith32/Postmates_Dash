var mongoose = require('mongoose');

var barDataSchema = new mongoose.Schema({
	id: Number,
	barName: String,
	barAddress: String,
	barArea: String,
	barDay: String,
	barHHStart: String,
	barHHEnd: String,
	barStars: Number,
	barReview: String,
	updateDate: {type: Date, default: Date.now},
	addDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model( 'barData' , barDataSchema);