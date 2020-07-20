var express = require("express");
var app     = express();
var bodyParser = require('body-parser')
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var foods = [
        {name: "Chole Bhature", image: "https://smedia2.intoday.in/aajtak/images/stories/072015/chole_bhature_pakwan_520_070815033739.jpg"},
        {name: "Pav Bhaji", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfQ4u4FIkY-SJkv6SoX5i7Q4hltUCFQ9jw4g&usqp=CAU"},
        {name: "Panner Butter Masala", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShbjNXnSwT17GKha-eL8fGER1j4ZeOrCx5JQ&usqp=CAU"}
        
];

app.get("/",function(req,res){
	res.render("home");
});

app.get("/food",function(req,res){
	res.render("food",{foods:foods});
});
 app.post("/food",function(req,res){
	 var name = req.body.name;
	 var image= req.body.image;
	 var newFood = {name:name,image:image};
	 foods.push(newFood);
	 res.redirect("/food");
 })
app.get("/food/new",function(req,res){
    res.render("new");	
});

app.listen(3000,function(){
	
	console.log("Server listening on port " + this.address().port);
	
})