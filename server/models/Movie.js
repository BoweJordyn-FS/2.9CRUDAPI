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
	status: {
		type: String,
		required: true,
		enum: ['want to watch', 'watched'],
	},
	rating: {
		type: Number,
		required: true,
	},
	notes: {
		type: String,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('Movie', movieSchema);
