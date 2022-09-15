require('./Models/Books');
require('./Models/User');
require('./Models/IssuedBooks');
require('./Models/ReturnedBooks');
require('./Models/Fine');
require('dotenv').config({ path: "./config.env" });


const express = require("express");
const connectDatabase = require('./db/connect');
const cors = require("cors");
const authroutes =require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require("body-parser");

const app = express();
connectDatabase();
app.use(cors());
app.use(express.json());

// Bodyparser middleware
app.use( bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth/', authroutes);
app.use('/api/', userRoutes);

app.listen(process.env.PORT , ()=> console.log(`Server started running on port ${process.env.PORT }`));

