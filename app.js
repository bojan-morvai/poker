const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const User = require("./models/user");

mongoose.connect('mongodb+srv://Bojan:klisaklisa@cluster0-rfxxc.mongodb.net/poker_db?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('connected to db');
}).catch(err => {
	console.log('ERROR:', err.message);
});

// Password configuration
const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(require("express-session")({
  secret: "vanja",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(function(req, res, next){
  currentUser = req.user;
	console.log("asdasd: "+ currentUser)
  next();
});


app.get('/',(req,res) =>{
  if(currentUser){
		var users=currentUser;
	} else {
		var users={username:'anonimus', kredit:1000, partije:0};
	}
	res.render('poker',{users:users});
});

const hostname = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});