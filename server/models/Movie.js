const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	runTime: {
		type: Number,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('Movie', movieSchema);
