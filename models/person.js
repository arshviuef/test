const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `${process.env.URL}`;

console.log(`Connecting to ${url}`);
mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", phonebookSchema);
