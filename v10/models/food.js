var mongoose = require("mongoose");
var foodSchema = new mongoose.Schema({
	name : String,
	image: String,
	description:String,
	author: {
		id:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
		},
		username:String
	},
	reviews    : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "Review"
		}
	]
});

module.exports = mongoose.model("Food",foodSchema);