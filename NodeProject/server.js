const express = require("express")
const sequelize  = require("./config/db")
const app = express()
const corsOptions =require("./config/corsOptions");
const dotenv = require('dotenv');
const morgan =require('morgan');
const colors = require('colors')
const cors=require("cors")
//dotenv config
dotenv.config();

//middlewares 
app.use(express.json())
app.use(morgan('dev'))

//security of the server 
app.use(cors(corsOptions));
app.use(cors());

const port= process.env.PORT || 5000
//listen port


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');

    // Start the server after the database connection is established
    app.listen(port,()=>{
        console.log(`server is running on port ${port} in Mode ${process.env.DEV_MODE} `.bgCyan.white)
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



