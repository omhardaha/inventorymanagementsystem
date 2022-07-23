const router = require("express").Router();
const Product = require("../models/Product");
const bcrypt = require("bcrypt");

// create post
router.post("/", async (req, res) => {
	try {
		const newProduct = new Product(req.body);
		const user = await newProduct.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});

//Update
router.put("/:id", async (req, res) => {
	try {
		const getProduct = await Post.findById(req.params.id);
		if (getProduct.username === req.body.username) {
			try {
				const updatedProduct = await Product.findByIdAndUpdate(
					req.params.id,
					{ $set: req.body },
					{ new: true }
				);
				res.status(200).json(updatedPost);
			} catch (error) {
				res.status(500).json("m");
			}
		} else {
			res.status(500).json("you can update only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//deletePost
router.delete("/:id", async (req, res) => {
	try {
		const getProduct = await Product.findById(req.params.id);
		if (getProduct.username === req.body.username) {
			try {
				await getProduct.delete();
				res.status(200).json("post has been deleted");
			} catch (error) {
				res.status(500).json("m");
			}
		} else {
			res.status(500).json("you can delete only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});
//getProduct
router.get("/:id", async (req, res) => {
	try {
		const getUser = await Product.findById(req.params.id);
		res.status(200).json(getUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

//getAllPost
router.get("/", async (req, res) => {
	const username = req.query.username;
	const catName = req.query.cat;
	try {
		let allPost;
		if (username) {
			allPost = await Product.find({ username });
		} else if (catName) {
			allPost = await Product.find({ categories: { $in: [catName] } });
		} else {
			allPost = await Product.find();
		}
		res.status(200).json(allPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
