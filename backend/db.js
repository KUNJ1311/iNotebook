const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://kunjfaladu1311:Kunj131148ksf@kunj.xrpcy2r.mongodb.net/test";

const connectToMongo = () => {
	mongoose.connect(mongoURI, () => {
		console.log("successfully connected");
	});
};
mongoose.set("strictQuery", false);

module.exports = connectToMongo;
