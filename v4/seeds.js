var mongoose   = require("mongoose");
var Food       = require("./models/food");
var Review       = require("./models/review");

var data = [
	{
		name: "Gajar Ka Halwa",
       image:"https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
       description:"Gajar ka halwa, also known as gajorer halua, Gajrela, Gajar Pak, and Carrot halwa is a carrot-based sweet dessert pudding from            the Indian subcontinent. It is made by placing grated carrots in a pot containing a specific amount of water, milk and sugar and then cooking          while  stirring regularly." 
	},
	{
		name:"Paneer Butter Masala",
        image:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description:"Creamy, slightly tart and makes me mop up the gravy with anything I can get my hands on. Just the thing you need when you are            craving comfort food but want something that hits all the right notes."
	},
	{
		name:"Chole Bhature",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnusgbPuw42ZFCG7ysEg3FCsNnq-wZMEuJEA&usqp=CAU",
        description:"Chole bhature is a food dish originating from northern India. Known as 'Halwa Puri' in Pakistan, it is a combination of                  chana masala and bhatura/Puri, a fried bread made from maida. There is a distinct Punjabi variant of the dish.  "
	},
	{
		name:"Pav Bhaji",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSDjoh6vjDr47GvlGRe26Xj7UCuRW6gNVFDGw&usqp=CAU",
        description:"Pav bhaji is a fast food dish from India. It consists of a thick vegetable curry served with a soft bread roll. Its origins are in        the state of Maharashtra. Variants of the dish may use other bread varieties such as chappati, roti or brown bread."
	}
	
];

function seedDB(){
	Food.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed Food items!!");
		data.forEach(function(seed){
			Food.create(seed,function(err,food){
				if(err){
					console.log(err);
				}else{
					console.log("Added a food item!!");
					Review.create(
					{
						author:"Foodie",
						review:"I loooooove food<3"
					},
					function(err,review){
						if(err){
							console.log(err);
						}else{
							food.reviews.push(review);
							food.save();
							console.log("Added a review!");
						}
							
					});
				}
			});
		});
	});
}

module.exports = seedDB;



