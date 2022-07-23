const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
app.use(express.json());
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
app.use("/images", express.static(path.join(__dirname + "/images")));
const sendmail = require("sendmail")();

const User = require("./models/Users");

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("MongoDB Connected"))
	.catch((err) => {
		console.log("Falied To Connect", err);
	});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ dest: "images/" });

// app.post("/upload", upload.single("file"), (req, res) => {
// 	res.status(200).json("File has been uploaded");
// });

app.post("/api/upload", upload.single("file"), (req, res) => {
	const fileType = req.file.mimetype.split("/")[1];
	const compleFileName = req.file.filename + "." + fileType;
	console.log(req.file);
	console.log(compleFileName);
	fs.rename(
		"images/" + req.file.filename,
		"images/" + compleFileName,
		(err) => {
			if (err) {
				console.log(err);
			}
		}
	);
	res.status(200).json(compleFileName);
});

app.post("/api/emailsend", async (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const otp = req.body.otp;

	try {
		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "omprakashhardaha369@gmail.com",
				pass: "kwmvgeuxipyboctj",
			},
			host: "smtp.gmail.com",
			port: 465,
		});

		var mailOptions = {
			from: '"Inventory Management Team" <omh@example.com>',
			to: email,
			subject: "OTP - Reset Your Passsword",
			text: `your OTP is - ${otp}`,
		};

		transport.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log("Message sent: %s", info.messageId);
			return res.status(200).json({ data: "sended" });
		});
	} catch (error) {
		console.log(error);
		return res.status(400).json("error");
	}

	res.status(200).json();
});

app.post("/api/isemail", async (req, res) => {
	console.log("req.body");
	console.log(req.body);
	try {
		const user = await User.findOne(req.body);
		console.log(user);
		res.json(user).status(200);
	} catch (error) {
		console.log(error);
		return res.status(401).json("failed");
	}
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/post", productRoute);
app.use("/api/category", categoryRoute);

app.listen("5000", () => {
	console.log("server is Running 5000");
});
