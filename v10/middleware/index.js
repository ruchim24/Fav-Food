var Food = require("../models/food");
var Review = require("../models/review");

var middlewareObj = {};

middlewareObj.checkFoodOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Food.findById(req.params.id,function(err,foundFood){
			if(err){
				res.redirect("back");
			}else{
				if(foundFood.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}
}

middlewareObj.checkReviewOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Review.findById(req.params.review_id, function(err, foundReview){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundReview.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;