const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { User } = require('../models');  // Pravilno uvezen model User

// Ruta za registraciju korisnika
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Proveri da li korisnik već postoji
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Kreiraj novog korisnika
    user = await User.create({
      email,
      password: await bcrypt.hash(password, 10)  // Hashiraj lozinku pre pohrane
    });

    // Kreiraj JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      'stvarnatajna',  // Zameni stvarnom tajnom
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Ruta za prijavu korisnika
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Proveri da li korisnik postoji
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Proveri da li je lozinka tačna
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Kreiraj JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      'stvarnatajna',  // Zameni stvarnom tajnom
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Zaštićena ruta - Dohvati informacije o korisniku
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'email'] });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Ruta za ažuriranje korisničkih podataka
router.put('/me', auth, async (req, res) => {
  const { email } = req.body;

  try {
    // Pronađi korisnika prema ID-u
    let user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Ažuriraj korisničke podatke
    user.email = email || user.email;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Ruta za promjenu lozinke
router.put('/me/password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Pronađi korisnika prema ID-u
    let user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Proveri da li je trenutna lozinka ispravna
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect current password' });
    }

    // Ažuriraj lozinku
    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
