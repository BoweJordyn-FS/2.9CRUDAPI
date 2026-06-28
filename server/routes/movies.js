const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const passport = require('passport');
const passportServices = require('../services/passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// RESTful endpoints for students
// GET POST PATCH DELETE

const getMovie = async (req, res, next) => {
	let movie;
	try {
		// Scope to the logged-in user so one user can't view/edit/delete another's movie.
		movie = await Movie.findOne({ _id: req.params.id, user: req.user._id });
		if (movie === null) {
			return res.status(404).json({ message: 'Movie not found' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.movie = movie;
	next();
};

// * GET ALL
router.get('/', protectedRoute, async (req, res) => {
	try {
		const movies = await Movie.find({ user: req.user._id });
		res.json(movies);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// * GET BY ID
router.get('/:id', getMovie, async (req, res) => {
	res.json(res.movie);
});

// * CREATE
router.post('/', async (req, res) => {
	const movie = new Movie({
		title: req.body.title,
		genre: req.body.genre,
		status: req.body.status?.trim().toLowerCase(),
		rating: req.body.rating || null,
		notes: req.body.notes,
		user: req.user._id,
	});
	try {
		const newMovie = await movie.save();
		res.status(201).json(newMovie);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// * UPDATE
router.patch('/:id', getMovie, async (req, res) => {
	if (req.body.title != null) res.movie.title = req.body.title;
	if (req.body.genre != null) res.movie.genre = req.body.genre;
	if (req.body.status != null)
		res.movie.status = req.body.status.trim().toLowerCase();
	if (req.body.rating != null) res.movie.rating = req.body.rating;
	if (req.body.notes != null) res.movie.notes = req.body.notes;
	try {
		const updatedMovie = await res.movie.save();
		res.json(updatedMovie);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// * DELETE
router.delete('/:id', getMovie, async (req, res) => {
	try {
		await res.movie.deleteOne();
		res.json({ message: 'Movie was removed' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
