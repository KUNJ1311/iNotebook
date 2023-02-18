const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://Kunj:Kunj131148ksf@cluster0.jtd2zpe.mongodb.net/inotebook";

const connectToMongo = () => {
	mongoose.connect(mongoURI, () => {
		console.log("successfully connected");
	});
};
mongoose.set("strictQuery", false);

module.exports = connectToMongo;
