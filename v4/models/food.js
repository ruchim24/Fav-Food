var mongoose = require("mongoose");
var foodSchema = new mongoose.Schema({
	name : String,
	image: String,
	description:String,
	reviews    : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref : "Review"
		}
	]
});

module.exports = mongoose.model("Food",foodSchema);