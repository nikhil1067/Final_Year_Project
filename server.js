const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const { User } = require('./models/auth');
const session = require('express-session');

app.use(session({
	secret:'happy dog',
	saveUninitialized: true,
	resave: true
}));

//Env Config
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Body Parser
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(path.join(__dirname + '/static')));






app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/static/index.html'));
})




app.listen(PORT);