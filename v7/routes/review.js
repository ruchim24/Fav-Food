var express = require("express");
var router  = express.Router({mergeParams: true});
var Food = require("../models/food");
var Review = require("../models/review");

router.get("/new",isLoggedIn,function(req,res){
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
		}else{
			res.render("reviews/new",{food:food});
		}
	})
});

router.post("/",isLoggedIn,function(req,res){
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
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;