var express = require("express");
var router  = express.Router();
var Food       = require("../models/food");
var middleware = require("../middleware");


router.get("/",function(req,res){
	Food.find({},function(err,allFood){
		if(err){
			console.log(err);
		}else{
			res.render("food/food",{foods:allFood});
		}
	});
});

 router.post("/",middleware.isLoggedIn,function(req,res){
	 var name = req.body.name;
	 var image= req.body.image;
	 var desc = req.body.description;
	 var author= {
		 id:req.user._id,
		 username:req.user.username
	 }
	 var newFood = {name:name,image:image,description:desc,author:author};
	Food.create(newFood,function(err,newlyCreated){
		if(err){
			console.log("err");
		}else{
			res.redirect("/food");
		}
	});
 });

router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("food/new");	
});

router.get("/:id",function(req,res){
	Food.findById(req.params.id).populate("reviews").exec(function(err,foundFood){
	if(err){
		console.log(err);
	}else{
		res.render("food/show",{food:foundFood});
	}
	});
});

router.get("/:id/edit",middleware.checkFoodOwnership,function(req,res){
	Food.findById(req.params.id,function(err,foundFood){
		res.render("food/edit",{food:foundFood});
	});
});



router.put("/:id",middleware.checkFoodOwnership, function(req, res){
    // find and update the correct campground
    Food.findByIdAndUpdate(req.params.id, req.body.food, function(err, updatedCampground){
       if(err){
           res.redirect("/food");
       } else {
           //redirect somewhere(show page)
           res.redirect("/food/" + req.params.id);
       }
    });
});

router.delete("/:id",middleware.checkFoodOwnership,function(req,res){
	Food.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/food");
		}else{
			res.redirect("/food");
		}
	});
});



module.exports = router;