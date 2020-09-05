const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
const { User } = require('./models/auth');
const exphbs = require('express-handlebars');
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//Handle Bars
app.engine('hbs', exphbs({
    extname: '.hbs'
})); 

app.set('view engine', 'hbs');

app.get('/signin.html', function (req, res) {
    res.render('signin');
});
// Save new user
app.use(express.static(path.join(__dirname + '/static')));
app.use('/', routes);
app.post('/signup.html', function(req, res) {
    const auth = new User({
        email:req.body.email,
        password: req.body.password
    }).save((err, response)=>{
        if(err) res.status(400).send(err)
        res.status(200).redirect('/signin.html')
    })
});




// Check Sign in
app.post('/signin.html', function(req, res) {
    User.findOne({'email': req.body.email}, (err, user)=>{
     if (err) throw err;
        
         if (!user) 
             res.render('signin', {
                 message: 'Invalid username or password',
                 messageClass: 'error'
             });
       
 
        // If email present compare pass
        user.comparePassword(req.body.password, (err, isMatch)=>{
           
            if (!isMatch || err) {
             res.render('signin', {
                 message: 'Invalid username or password',
                 messageClass: 'error'
             });
            }
             else    res.status(200).redirect('/viewissues.html')
        })
    })
 });


app.listen(PORT);