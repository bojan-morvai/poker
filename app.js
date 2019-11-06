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
mongoose.set('useFindAndModify', false);

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
  next();
});


app.get('/',(req,res) =>{
  if(currentUser){
		var users=currentUser;
	} else {
		var users={username:undefined, credit:1000, count_games:5};
	}
	res.render('poker',{users:users});
});

app.post('/save',(req,res)=>{
  let newUser = new User({username:req.body.username, credit:req.body.credit, count_games:req.body.count_games});
  User.register(newUser, req.body.password, (err,user)=>{
    if(err){
      return res.render('poker')
    }
    passport.authenticate('local')(req,res, ()=>{
      res.redirect('/')
    });
  });
});

app.get("/login", function(req, res){
  res.render("login"); 
});

app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/load",
    failureRedirect: "/"
  }), function(req, res){
});

app.get("/logout", (req, res)=>{
  req.logout();
  res.redirect("/");
});

app.get('/load', (req,res) =>{
	User.findById(currentUser, function(err,user){
		if(err){
			res.send("Something went wrong! "+err)
		} else {
			res.redirect('/')
		}
	})
})

// UPDATE ROUTE
app.put("/update/:id", function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, updatedUser){
    	if(err){
    		res.send("ERROR");
		}  else {
            res.redirect("/load");
        }
    });
});

const hostname = process.env.IP;// || '127.0.0.1';
const port = process.env.PORT;// || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});