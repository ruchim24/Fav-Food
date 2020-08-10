var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
var mongoose   = require("mongoose");
var Food       = require("./models/food");
var Review      = require("./models/review");
var User        = require("./models/user");
var seedDB     = require("./seeds");
var passport   = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");

mongoose.connect('mongodb://localhost:27017/Fav_Food', {useNewUrlParser: true, useUnifiedTopology:true});
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
// seedDB();

//passport-configuation
app.use(require("express-session")({
    secret: "I love food.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

var foodRoutes   = require("./routes/food"),
	reviewRoutes = require("./routes/review"),
	indexRotes   = require("./routes/index");


app.get("/",function(req,res){
	res.render("home");
});

app.use("/food",foodRoutes);
app.use("/food/:id/reviews",reviewRoutes);
app.use("/",indexRotes);

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.listen(3000,function(){
	
	console.log("Server listening on port " + this.address().port);
	
});

