"use strict";

var express = require('express');

var _require = require('../Controllers/auth/auth-controller'),
    registerUser = _require.registerUser,
    loginUser = _require.loginUser,
    logoutUser = _require.logoutUser,
    authMiddleware = _require.authMiddleware;

var router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // router.get("/check-auth",authMiddleware,(req,res)=>{
//     const user = req.user;
//     res.status(200).json({
//         success:true,
//         message:"Authenticated user!",
//         user,
//     })
// })

router.get("/check-auth", authMiddleware, function (req, res) {
  var user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!"
    });
  }

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user: user
  });
});
module.exports = router;