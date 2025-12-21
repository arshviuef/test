const express = require("express");
const morgan = require("morgan");
const Note = require("./models/person");
const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/persons", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Note.countDocuments({})
    .then((result) => {
      const currentDate = new Date();
      response.send(`<h2>Phonebook has info for ${result} people</h2>
      <h2>${currentDate}</h2>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((result) => {
      if (!result) {
        return response.status(404).end();
      }

      response.json(result);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (!result) {
        return response.status(404).json({ error: "not found" });
      }

      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  Note.findOne({ name: body.name }).then((result) => {
    if (result) {
      return response.status(409).json({ error: "name must be unique" });
    }
    if (!body.name) {
      return response.status(400).json({ error: "missing name" });
    }
    if (!body.number) {
      return response.status(400).json({ error: "missing number" });
    }

    const person = new Note({
      name: body.name,
      number: body.number,
    });

    person
      .save()
      .then((savedNote) => {
        response.json(savedNote);
      })
      .catch((error) => next(error));
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
