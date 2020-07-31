var express = require("express");
var router  = express.Router();
var Food       = require("../models/food");

router.get("/",function(req,res){
	Food.find({},function(err,allFood){
		if(err){
			console.log(err);
		}else{
			res.render("food/food",{foods:allFood});
		}
	});
});

 router.post("/",function(req,res){
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

router.get("/new",function(req,res){
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

module.exports = router;