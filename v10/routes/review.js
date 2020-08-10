var express = require("express");
var router  = express.Router({mergeParams: true});
var Food = require("../models/food");
var Review = require("../models/review");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
		}else{
			res.render("reviews/new",{food:food});
		}
	})
});

router.post("/",middleware.isLoggedIn,function(req,res){
	Food.findById(req.params.id,function(err,food){
		if(err){
			console.log(err);
			res.redirect("/food");
		}else{
		 Review.create(req.body.review,function(err,review){
			 if(err){
				 console.log(err);
			 }else{
				 review.author.id = req.user._id;
               review.author.username = req.user.username;
				
				 review.save();
				 food.reviews.push(review);
				 food.save();
				 res.redirect("/food/" + food._id);
			 }
		 });
		}
	});
});

router.get("/:review_id/edit",middleware.checkReviewOwnership,function(req,res){
	Review.findById(req.params.review_id,function(err,foundReview){
		if(err){
			res.redirect("back");
		}else{
			res.render("reviews/edit",{food_id:req.params.id,review:foundReview});
		}
	});
});

router.put("/:review_id",middleware.checkReviewOwnership,function(req,res){
	Review.findByIdAndUpdate(req.params.review_id,req.body.review,function(err,updateReview){
		if(err){
			res.redirect("back");
			console.log("error");
		}else{
			res.redirect("/food/" + req.params.id);
		}
	});
});

router.delete("/:review_id",middleware.checkReviewOwnership,function(req,res){
	Review.findByIdAndRemove(req.params.review_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			console.log(req.params.review_id);
			res.redirect("/food/" + req.params.id);
		}
	});
});


module.exports = router;