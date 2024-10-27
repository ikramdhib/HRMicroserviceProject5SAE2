const express = require('express');
const db = require('../config/db');
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

const getAllUsers = async (req , res) =>{

    try {
    const users = await User.findAll()

    if(!users.length){
      return res.status(400).json({ error: 'there is no DATA' });
    }

    res.status(200).json(users);

  } catch (error){
    console.error("there is an error while getting data", error);
    res.status(400).json({ error: error.message });
  }

  }

  const CreateUser = async (req , res) =>{

    try {
    const { username, email , passwordi, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordi, salt);

    const newUser = await User.create({
      username, 
      email ,
      password, 
      role
    })

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
}



  module.exports ={
  getAllUsers,
  CreateUser
  }