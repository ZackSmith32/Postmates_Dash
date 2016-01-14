var mongoose = require('mongoose');

var barDataSchema = new mongoose.Schema({
	id: Number,
	barName: String,
	barAddress: String,
	barArea: String,
	barDay: Array,
	barHHStart: String,
	barHHEnd: String,
	barStars: Number,
	barReview: String,
	updateDate: {type: Date, default: Date.now},
	addDate: {type: Date, default: Date.now},
	barLink: String
});

module.exports = mongoose.model( 'barData' , barDataSchema);