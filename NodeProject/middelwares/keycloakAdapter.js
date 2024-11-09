// keycloakAdapter.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User"); // Assurez-vous d'importer votre modèle utilisateur
const qs = require('qs');
async function getKeycloakToken(email,password){
    try {
      const response = await axios.post(
        'http://keycloak:8080/realms/HR-realm/protocol/openid-connect/token',
        qs.stringify({
            client_id: 'api-gateway-client',
            client_secret: 'V5ON0UKESxNL1SSsVQH0fifOsj3SOK5C',
            username: email,
            password: password,
            grant_type: 'password'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Unable to obtain Keycloak token');
    }
  };

const verifyJwtToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const foundUser = await User.findOne({ where: { id: decoded.UserInfo.id } });
        if (!foundUser) {
            throw new Error("User not found");
        }
        return foundUser;
    } catch (error) {
        console.error("JWT verification error:", error);
        throw new Error("Invalid JWT token");
    }
};

module.exports = { getKeycloakToken, verifyJwtToken };
