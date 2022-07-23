const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);
const Cat = mongoose.model("category", categorySchema);
module.exports = Cat
