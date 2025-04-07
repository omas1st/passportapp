// routes/index.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Homepage
router.get('/', (req, res) => {
  res.render('home');  // Renders views/home.ejs
});

// Registration page
router.get('/register', (req, res) => {
  res.render('registration');  // Renders views/registration.ejs
});

// Handle registration submission (Steps 1-3)
router.post('/register', async (req, res) => {
  try {
    // Here, extract data from req.body (you may need to adjust based on your form fields)
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
      paymentDetails: req.body.paymentDetails, // should be structured accordingly
    });
    await newUser.save();
    // Redirect to Step 4 page
    res.redirect('/step4');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Step 4: Biometrics and Appointment
router.get('/step4', async (req, res) => {
  // For demonstration, you could load the latest submission or pass summary data via session
  const latestUser = await User.findOne().sort({ createdAt: -1 });
  res.render('step4', { user: latestUser });
});

// Additional route for Visa Application button redirection (example)
router.get('/visa', (req, res) => {
  // Redirect or render visa application page
  res.send('Visa Application page - Under Construction');
});

module.exports = router;
