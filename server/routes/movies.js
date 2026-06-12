const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Restful endpouts for students
// GET POST PUT DELETE

const getMovie = async (req, res, next) => {
	let movie;
	try {
		movie = await Movie.findById(req.params.id);
		if (movie === null) {
			return res.status(400).json({ message: 'Movie not found' });
		}
	} catch (error) {
		return res.status(500);
	}
	res.movie = movie;
	next();
};

// * GET ALL
router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		res.json(movies);
	} catch (error) {
		res.status(500);
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
		runTime: req.body.runTime,
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
	if (req.body.title != null) {
		res.movie.title = req.body.title;
	}
	if (req.body.genre != null) {
		res.movie.genre = req.body.genre;
	}
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
		await res.movie.remove();
		res.json({ message: 'Movie was removed' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
