const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `${process.env.URL}`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Note = mongoose.model("Note", phonebookSchema);

if (process.argv[3] && process.argv[4]) {
  const note = new Note({
    name: process.argv[3],
    number: process.argv[4],
  });

  note.save().then((result) => {
    console.log(`Added ${note.name} number ${note.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(`${note.name} ${note.number}`);
    });
    mongoose.connection.close();
  });
}
