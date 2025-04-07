// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware for simple admin authentication
const adminAuth = (req, res, next) => {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

// Admin login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle admin login (this is a very basic example; consider using proper authentication in production)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with secure check
  if (username === 'admin' && password === 'admin123') {
    req.session.admin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

// Admin dashboard with search by email
router.get('/dashboard', adminAuth, async (req, res) => {
  let query = {};
  if (req.query.email) {
    query.email = req.query.email;
  }
  const users = await User.find(query).sort({ createdAt: -1 });
  res.render('admin', { users });
});

// Admin logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

module.exports = router;
