// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// EJS setup
app.set('view engine', 'ejs');

// Session setup (for admin authentication)
app.use(session({
  secret: '691dab64803c6cb854099ba5a7f4cc382970746eb9e4cc6aaaec3bff15c7554b6cd4d6e0ed000a0bf56ac0d9eb4e9acc9db935f312df5fb2a8e10932d6fa9dc7',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
