const express = require("express"); // importing express for creating server
const cors = require("cors"); // Importing cors
const app = express();    // Defining App Component to use express
const { connection } = require("./connector"); // importing connector.js to make DB connection

const port = 8080; // Defining port to run server

app.use(cors()); // Using cors for cross origin resource sharing here frontend and backend

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// POST API which insert booking data to dataBase
app.post("/api/booking", async (req, res) => {
  const { movie, slot, seats } = req.body;
  try {
    // if body, movie or slot are empty then it will be true
    // as well as it will check seat selected or not
    if (!movie || !slot) {
      res.send({ result: "Please Choose proper way!" });
    } else if (
      seats.A1 ||
      seats.A2 ||
      seats.A3 ||
      seats.A4 ||
      seats.D1 ||
      seats.D2
    ) {
      let data = new connection(req.body);
      let result = await data.save();
      res.status(200).send(result);
    } else {
      res.send({ result: "Please select a slot!" });
    }
  } catch (err) {
    // console.log(err);
    res.status(401).send({ result: "Please Don't use wrong way!" });
  }
});

// GET API for returning last booking details from dataBase
app.get("/api/booking", async (req, res) => {
  let data = await connection.find();
  if (data.length == 0) {
    res.send([]);
  } else {
    res.send([data[data.length - 1]]);
  }
});

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
