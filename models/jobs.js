var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	userID: Number,
	shiftNumber: { type: Number, required: true},
	jobStart: Date,
	jobEnd: Date,
	jobLengthHours: Number,
	jobMerchant: String,
	jobPayout: Number,
	jobTip: Number,
	jobTipPending: Boolean,
	jobTotal: Number,
	jobCancel: String,
	jobPromotion: String,
	updated_at: Date,
	created_at: Date
});

jobSchema.pre('save', function(next) {
	var currentDate = new Date()

	this.updated_at = currentDate

	if (!this.created_at)
		this.created_at = currentDate

	next()
});

module.exports = mongoose.model( 'Jobs' , jobSchema);