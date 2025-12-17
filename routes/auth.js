const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


const router = express.Router();


// REGISTER
router.post('/register', async (req, res) => {
try {
const { username, password, role } = req.body;


const existing = await User.findOne({ username });
if (existing) return res.status(400).json({ message: 'User already exists' });


const hash = await bcrypt.hash(password, 10);


const user = new User({
username,
password: hash,
role: role || 'user'
});


await user.save();
res.json({ message: 'Register success' });
} catch (err) {
res.status(500).json({ message: err.message });
}
});


// LOGIN
router.post('/login', async (req, res) => {
try {
const { username, password } = req.body;


const user = await User.findOne({ username });
if (!user) return res.status(401).json({ message: 'User not found' });


const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(401).json({ message: 'Wrong password' });


const token = jwt.sign(
{ id: user._id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: '1d' }
);


res.json({ message : "Welcome " + user.role,token, role: user.role });
} catch (err) {
res.status(500).json({ message: err.message });
}
});


module.exports = router;