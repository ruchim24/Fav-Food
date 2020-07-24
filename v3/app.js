var express = require("express");
var app     = express();
var bodyParser = require('body-parser');
var mongoose   = require("mongoose");
var Food       = require("./models/food");
var Review      = require("./models/review");
var seedDB     = require("./seeds")
mongoose.connect('mongodb://localhost:27017/Fav_Food', {useNewUrlParser: true, useUnifiedTopology:true});
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
seedDB();

// var foods = [
//         {name: "Chole Bhature", image: "https://smedia2.intoday.in/aajtak/images/stories/072015/chole_bhature_pakwan_520_070815033739.jpg"},
//         {name: "Pav Bhaji", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfQ4u4FIkY-SJkv6SoX5i7Q4hltUCFQ9jw4g&usqp=CAU"},
//         {name: "Panner Butter Masala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShbjNXnSwT17GKha-eL8fGER1j4ZeOrCx5JQ&usqp=CAU"}
        
// ];



app.get("/",function(req,res){
	res.render("home");
});

app.get("/food",function(req,res){
	Food.find({},function(err,allFood){
		if(err){
			console.log(err);
		}else{
			res.render("food",{foods:allFood});
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
    res.render("new");	
});

app.get("/food/:id",function(req,res){
	Food.findById(req.params.id).populate("reviews").exec(function(err,foundFood){
	if(err){
		console.log(err);
	}else{
		res.render("show",{food:foundFood});
	}
	});
});
app.listen(3000,function(){
	
	console.log("Server listening on port " + this.address().port);
	
})