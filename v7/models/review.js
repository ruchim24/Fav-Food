var mongoose = require("mongoose");
var reviewSchema = new mongoose.Schema({
	author : String,
	review : String
	
});

module.exports = mongoose.model("Review",reviewSchema);