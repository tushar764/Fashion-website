const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User'); 

// Register
const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const checkUser = await User.findOne({ email });
        
        if (checkUser) {
            return res.json({ success: false, message: 'User with this email already exists. Try another email.' });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User registration successful",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
};

// Login 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        
        if (!checkUser) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist. Please register first."
            });
        }

        // ✅ Fix: Compare plain password with hashed password
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

        if (!checkPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password. Please try again."
            });
        }

        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email,userName: checkUser.userName ,},
            'CLIENT_SECRET_KEY',
            { expiresIn: '60mins' }
        );

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        });

    } catch (e) {
        console.error("Login error:", e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// logout 
const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully!",
    });
};

// auth Middleware
const authMiddleware= async (req,res,next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success:false,
        message:'unauthorised user!'
    })
    try {
        
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
        next()

    } catch (error) {
        res.status(401).
        json({
            success:false,
            message:'unauthorised user!'
        })
    }
}


module.exports = { registerUser, loginUser,logoutUser ,authMiddleware};
