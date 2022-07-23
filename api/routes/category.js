const router = require("express").Router();
const Categories = require("../models/Category");
const Product = require("../models/Product");

// create categoru
router.post("/", async (req, res) => {
	try {
		console.log(req.body);
		await Categories.createIndexes();
		const allread = await Categories.find(req.body);
		if (allread.length != 0) {
			console.log(allread);
			return res.status(400).json("already found");
		}
		const newCat = new Categories(req.body);
		const savedCat = await newCat.save();
		console.log(savedCat);
		res.status(200).json(savedCat);
	} catch (error) {
		res.status(500).json(error);
	}
});
//get categoru
router.get("/", async (req, res) => {
	try {
		const cats = await Categories.find();
		res.status(200).json(cats);
	} catch (error) {
		res.status(500).json(error);
	}
});
router.delete("/", async (req, res, data) => {
	try {
		console.log("res.body.data");
		console.log(req.body);
		const allread = await Product.deleteMany(
            {$and : [
                 {categories: { $elemMatch: { $eq: req.body.name } }} , {username:req.body.username}
            ]}
        );
        await Categories.findOneAndDelete({name: req.body.name});
		console.log(allread);
		return res.status(200).json();
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
