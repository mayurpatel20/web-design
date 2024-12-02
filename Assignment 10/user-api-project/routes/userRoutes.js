const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Job = require('../models/Job'); 


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      role: user.type, 
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.post('/create', async (req, res) => {
  const { fullName, email, password, type } = req.body;
  try {
    if (!['admin', 'employee'].includes(type)) {
      return res.status(400).json({ message: "Type must be 'admin' or 'employee'" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, type });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/create/job', async (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body;
  try {
    const newJob = new Job({ companyName, jobTitle, description, salary });
    await newJob.save();
    res.status(201).json({ message: 'Job created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/get/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
