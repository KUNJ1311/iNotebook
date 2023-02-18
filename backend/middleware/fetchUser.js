var jwt = require("jsonwebtoken");
const JWT_SECRET = "Kunj@signed_by_kunj1311";

const fetchuser = (req, res, next) => {
	//Get the user from the jwt token and add id req object
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "Please authenticate using a vaild token" });
	}
	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.user = data.user;
	} catch (error) {
		res.status(401).send({ error: "Please authenticate using a vaild token" });
	}
	next();
};

module.exports = fetchuser;
