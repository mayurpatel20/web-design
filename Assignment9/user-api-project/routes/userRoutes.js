const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('../models/User');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/create', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters and include numbers and letters.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/edit', async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.fullName = fullName;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
  router.delete('/delete', async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOneAndDelete({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
  router.get('/getAll', async (req, res) => {
    try {
      const users = await User.find({}, 'fullName email');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  
  const fileFilter = (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type'), false);
  };
  
  const upload = multer({ storage, fileFilter });
  
  router.post('/uploadImage', upload.single('image'), async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.imagePath = req.file.path;
      await user.save();
      res.status(200).json({ message: 'Image uploaded successfully', path: req.file.path });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  
module.exports = router;
  
  
