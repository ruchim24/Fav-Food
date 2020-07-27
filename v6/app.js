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

mongoose.connect('mongodb://localhost:27017/Fav_Food', {useNewUrlParser: true, useUnifiedTopology:true});
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDB();

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


app.get("/",function(req,res){
	res.render("home");
});

app.get("/food",function(req,res){
	Food.find({},function(err,allFood){
		if(err){
			console.log(err);
		}else{
			res.render("food/food",{foods:allFood});
		}
	});
});

 app.post("/food",function(req,res){
	 var name = req.body.name;
	 var image= req.body.image;
	 var desc = req.body.description;
	 var newFood = {name:name,image:image,description:desc};
	Food.create(newFood,function(err,newlyCreated){
		if(err){
			console.log("err");
		}else{
			res.redirect("/food");
		}
	});
 });

app.get("/food/new",function(req,res){
    res.render("food/new");	
});

app.get("/food/:id",function(req,res){
	Food.findById(req.params.id).populate("reviews").exec(function(err,foundFood){
	if(err){
		console.log(err);
	}else{
		res.render("food/show",{food:foundFood});
	}
	});
});

app.get("/food/:id/reviews/new",function(req,res){
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
		}else{
			res.render("reviews/new",{food:food});
		}
	})
});

app.post("/food/:id/reviews",function(req,res){
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
			res.redirect("/food");
		}else{
		 Review.create(req.body.review,function(err,review){
			 if(err){
				 console.log(err);
			 }else{
				 food.reviews.push(review);
				 food.save();
				 res.redirect("/food/" + food._id);
			 }
		 });
		}
	});
})

//AUTH routes

app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/food"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/food",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/food");
});

app.listen(3000,function(){
	
	console.log("Server listening on port " + this.address().port);
	
})