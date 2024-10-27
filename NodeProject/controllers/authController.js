const User = require("../models/User");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { randomString } = require("../utils/random");
const { verifyEmail } = require("../utils/sendEmail");


const register = async (req, res) => {
    const { username, phone , cin, email, password,role } = req.body;
    // Check if all required fields are provided
    if (!username || !email || !password ||!phone ||!cin) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if the user with the given email already exists
      const foundUser = await User.findOne({where:{ email: email }});
      if (foundUser) {
        return res.status(401).json({ message: "User email already exists" });
      }
  
      // Hash the provided password
      const hashedPassword = await bcrypt.hash(password, 10);
      const codeVerification = randomString(20);
  
      // Create a new user in the database
      const user = await User.create({
        username,
        phone,
        cin,
        email,
        password: hashedPassword,
        role: role || undefined,
        verificationCode:codeVerification
      });
      const link = `http://localhost:5000/auth/verify?code=${codeVerification}`;
      verifyEmail(email, username, link);
      // Generate an access token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: user.id,
            role: user.role
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
  
      // Generate a refresh token
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: user.id,
            role: user.role
  
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server not js can access
        secure: true, //https
        sameSite: "None", //send to the domain that you deploy your app cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //expire date of the cookie  1000 1s * 60s * 60m * 24 hours * 7 numbre of days
      });
  
      res.status(201).json({
        accessToken,
        email: user.email,
        username: user.username,
        
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  
const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      // Check if the user with the given email already exists
      const foundUser = await User.findOne({where:{ email: email }});
      if (!foundUser) {
        return res.status(401).json({ message: "User does not exist" });
      }
  
      // compare the password from req.body and saved in db
      const matchPassword = await bcrypt.compare(password, foundUser.password);
  
      if (!matchPassword)
        return res.status(401).json({ message: "Wrong Password" });
  
      // Generate an access token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role
  
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
  
      // Generate a refresh token
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
            role: foundUser.role
  
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server not js can access
        secure: false, //not accessible https
        sameSite: "None", //send to the domain that you deploy your app cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //expire date of the cookie  1000 1s * 60s * 60m * 24 hours * 7 numbre of days
      });
  
     
      res.status(201).json({
        accessToken,
        email: foundUser.email,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error : Login Error" });
    }
  };
  
const refresh = (req, res) => {
    const cookies = req.cookies;
  
    // Check if jwt cookie is present
    if (!cookies || !cookies.jwt) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const refreshToken = cookies.jwt;
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        // Check for token verification errors
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
  
        try {
          // Find user by ID from the decoded token
          const foundUser = await User.findById(decoded.UserInfo.id).exec();
          // Check if user exists
          if (!foundUser) {
            return res.status(401).json({ message: "Unauthorized" });
          }
  
          // Create a new access token
          const accessToken = jwt.sign(
            {
              UserInfo: {
                id: foundUser.id,
                role : foundUser.role
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" } // Specify the expiration time appropriately
          );
  
          // Send the new access token in the response
          return res.json({ accessToken });
        } catch (error) {
          console.error("Error fetching user:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      }
    );
  };
  
  const logout = (req, res) => {
    // get the cookies that already saved
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //no content
    //delete the cookie 
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json({ message: "Logged out" });
  };



  module.exports = {
    register,
    login,
    refresh,
    logout,
  };