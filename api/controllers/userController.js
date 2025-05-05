const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Op } = require('sequelize');

const SALT_ROUNDS = 10;

const createUser = async (req, res) => {
  const { name, email, password, username } = req.body;

  try {
    let existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      const errorMessage = existingUser.email === email
        ? 'Email already registered!'
        : 'Username already registered!';
      return res.status(400).json({ error: errorMessage });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return res.status(500).json({ error: 'Failed to hash password' });
    }
    const result = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('Failed to create user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

module.exports = {
  createUser
};