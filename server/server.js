const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
require('./services/passport');
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const requireAuth = require('./middleware/requireAuth');

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Auth routes are public; the movies API is protected by reusable JWT middleware.
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movies', requireAuth, moviesRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*path', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
