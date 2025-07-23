const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require('../Controllers/auth/auth-controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/check-auth', authMiddleware, (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user!',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Authenticated user!',
    user,
  });
});

module.exports = router;
