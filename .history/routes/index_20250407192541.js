// routes/index.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Homepage
router.get('/', (req, res) => {
  res.render('home');
});

// Registration page
router.get('/register', (req, res) => {
  res.render('registration');
});

// Handle registration submission (Steps 1-3)
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      idNumber: req.body.idNumber,
      fullName: req.body.fullName,
      cellphone: req.body.cellphone,
      email: req.body.email,
      passportType: req.body.passportType,
      maritalStatus: req.body.maritalStatus,
      employment: req.body.employment,
      emergencyContact: req.body.emergencyContact,
      dob: req.body.dob,
      parentalConsent: req.body.parentalConsent === 'on',
      paymentMode: req.body.paymentMode,
      // Assume paymentDetails come in as JSON stringified; adjust as needed
      paymentDetails: req.body.paymentDetails || {}
    });
    await newUser.save();
    res.redirect('/step4');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Step 4: Biometrics and Appointment
router.get('/step4', async (req, res) => {
  const latestUser = await User.findOne().sort({ createdAt: -1 });
  res.render('step4', { user: latestUser });
});

// Visa Application route (for demonstration)
router.get('/visa', (req, res) => {
  res.send('Visa Application page - Under Construction');
});

module.exports = router;
