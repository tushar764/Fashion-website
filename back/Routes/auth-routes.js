const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require('../Controllers/auth/auth-controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authenticated user!',
    user: req.user,
  });
});

module.exports = router;
