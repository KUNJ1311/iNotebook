const express = require("express");
const User = require("../models/User");
var fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "Kunj@signed_by_kunj1311";

//ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser", [body("name", "Enter valid name").isLength({ min: 2 }), body("email", "Enter valid email").isEmail(), body("password", "Password must be atleast 8 characters").isLength({ min: 8 })], async (req, res) => {
	//If there are errors, return bad request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	//Check whether the user with this email exists already
	try {
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({ error: "Sorry a user with this email is already exists" });
		}

		//Create new users
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt);
		user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: secPass,
		});

		const data = {
			user: {
				id: user.id,
			},
		};
		const authtoken = jwt.sign(data, JWT_SECRET);

		res.json({ authtoken });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

//ROUTE 2 : Authenticate a user using: POST "/api/auth/login" no login required
router.post("/login", [body("email", "Enter valid email").isEmail(), body("password", "Password can not be blank").exists()], async (req, res) => {
	//If there are errors, return bad request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let success = false;
		return res.status(400).json({ success, errors: errors.array() });
	}

	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			let success = false;
			return res.status(400).json({ success, error: "Please try to login with correct credentials" });
		}
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			let success = false;
			return res.status(400).json({ success, error: "Please try to login with correct credentials" });
		}
		const data = {
			user: {
				id: user.id,
			},
		};
		const authtoken = jwt.sign(data, JWT_SECRET);
		let success = true;
		res.json({ success, authtoken });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

//ROUTE 3 : Get loged in user details using: POST "/api/auth/getuser" login required
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});
module.exports = router;
