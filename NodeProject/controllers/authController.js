const User = require("../models/User");
require('dotenv').config();
const axios = require('axios'); // Ajoutez cette ligne pour importer axios
const bcrypt = require('bcrypt'); // Assurez-vous d'utiliser bcrypt pou
const jwt = require("jsonwebtoken");
const { randomString } = require("../utils/random");
const { verifyEmail } = require("../utils/sendEmail");
const { getKeycloakToken, verifyJwtToken } = require("../middelwares/keycloakAdapter"); // Chemin vers le service intermédiaire

  const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if all required fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        // Check if the user with the given email already exists
        const foundUser = await User.findOne({ where: { email: email } });
        if (!foundUser) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Compare the password from req.body and saved in db
        const matchPassword = await bcrypt.compare(password, foundUser.password);
        if (!matchPassword) {
            return res.status(401).json({ message: "Wrong Password" });
        }

        // Get Keycloak token
        const keycloakToken = await getKeycloakToken(email,password);
        const response ={
          accessToken: keycloakToken, 
          email: foundUser.email,
          id :foundUser.id,
          role:foundUser.role
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error : Login Error" });
    }
};
  
const refresh = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
      return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
      // Vérifiez si le refresh_token est valide auprès de Keycloak
      const response = await axios.post(
          'http://keycloak:8080/realms/HR-realm/protocol/openid-connect/token',
          qs.stringify({
              client_id: 'api-gateway-client',
              client_secret: 'V5ON0UKESxNL1SSsVQH0fifOsj3SOK5C',
              grant_type: 'refresh_token',
              refresh_token: refresh_token,
          }),
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }
      );

      // Si la réponse contient un nouveau token, nous renvoyons ces informations
      if (response.data) {
          const { access_token, refresh_token: newRefreshToken } = response.data;

          return res.status(200).json({
              access_token,
              refresh_token: newRefreshToken
          });
      } else {
          return res.status(401).json({ message: "Invalid refresh token" });
      }
  } catch (error) {
      console.error("Error refreshing token:", error);
      return res.status(500).json({ message: "Internal server error during token refresh" });
  }
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
    login,
    refresh,
    logout,
  };