
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer");

const User = require('../models/userModel');
const UserDetails = require('../models/userDetailsModel');



const signup = async (req, res, next) => {
    const { username, password, fullName, email, age, tedXID } = req.body; 
    const userInfo = { username, password, fullName, email, age, tedXID }; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        const userDetails = new UserDetails({ userId: user._id, tedXID, fullName, email, age });
        await userDetails.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res  .cookie("access_token", token, {
            httpOnly: true,
          }).status(200).json({ message: "Successfully registered", userInfo});
    } catch (err) {
        next(err);
    }
};


const login=async (req, res,next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const  userDetails=await UserDetails.findOne({userId:user._id});
           
        const userInfo = {
            _id: user._id,
            username: user.username,
            tedXID: userDetails.tedXID ,
            fullName: userDetails.fullName,
            email: userDetails.email,
            age: userDetails.age
           
            
        };

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("access_token", token, {
            httpOnly: true,
          }).json({ message:"success fully logined ",userInfo});
    } catch (err) {
 next(err)
    }
}
const forgotPassword= async (req, res) => {
    let { email } = req.body;
    try {
        let user = await UserDetails.findOne({ email });
        if (!user) {
            return res.json({ message: "No account found for this email" });
        }
        const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        var mailOptions = {
            from: 'ebinamson91@gmail.com',
            to: email,
            subject: 'Reset Password Link for TedX cusat',
            text: `Reset your password using this link: http://localhost:3000/auth/reset-password/${token}`,
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.error("Error sending email:", err);
          next(err)
        } else {
            console.log("Email sent:", info.response);
            return res.json({ status: true, message: "Email sent successfully on Given email;" });
        }
        });
    } catch (err) {
       next(err)
    }
};

const resetPassword= async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;

    console.log("Token:", token);
    console.log("New Password:", password);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const id = decoded.id;
        console.log("User ID:", id);

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(id, { password: hashedPassword });

        return res.status(200).json({  message: "Password updated successfully" });
    } catch (err) {
       next(err)
    }
};

module.exports = {signup,login,forgotPassword,resetPassword}
