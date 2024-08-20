const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      onboardingCompleted: false, // Default onboarding status to false
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'yourSecretKey', {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'yourSecretKey', {
      expiresIn: '1h',
    });

    res.json({ token, onboardingCompleted: user.onboardingCompleted });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to get user info (including onboarding status)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      onboardingCompleted: user.onboardingCompleted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update onboarding completion
router.put('/complete-onboarding', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.onboardingCompleted = true;
    await user.save();

    res.json({ msg: 'Onboarding completed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
