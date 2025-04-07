// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Step 1: Profile Registration
  idNumber: String,
  fullName: String,
  cellphone: String,
  email: String,
  // Step 2: Application Submission
  serviceType: { type: String, default: 'Passport Application' },
  passportType: { type: String, enum: ['32-page', '48-page'], required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widow'] },
  employment: String,
  emergencyContact: String,
  dob: Date,
  parentalConsent: { type: Boolean, default: false },
  // Step 3: Payment
  paymentMode: { type: String, enum: ['Bank Transfer/Deposit', 'Cryptocurrency'] },
  // Payment details stored as an object
  paymentDetails: Object,
  // New field: Payment confirmation
  paymentConfirmed: { type: Boolean, default: false },
  // Timestamp
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
