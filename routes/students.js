const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Restful endpouts for students
// GET POST PUT DELETE

const getStudent = async (req, res, next) => {
	let student;
	try {
		student = await Student.findById(req.params.id);
		if (student === null) {
			return res.status(400).json({ message: 'student not found' });
		}
	} catch (error) {
		return res.status(500);
	}
	res.student = student;
	next();
};

// * GET ALL
router.get('/', async (req, res) => {
	try {
		const students = await Student.find();
		res.json(students);
	} catch (error) {
		res.status(500);
	}
});

// * GET BY ID
router.get('/:id', getStudent, async (req, res) => {
	res.json(res.student);
});

// * CREATE
router.post('/', async (req, res) => {
	const student = new Student({
		name: req.body.name,
		class: req.body.class,
	});
	try {
		const newStudent = await student.save();
		res.status(201).json(newStudent);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// * UPDATE
router.patch('/:id', getStudent, async (req, res) => {
	if (req.body.name != null) {
		res.student.name = req.body.name;
	}
	if (req.body.class != null) {
		res.student.name = req.body.class;
	}
	try {
		const updatedStudent = await Student.save();
		res.json(updatedStudent);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// * DELETE
router.delete('/:id', getStudent, async (req, res) => {
	try {
		await res.student.remove();
		res.json({ message: 'Student was removed' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
