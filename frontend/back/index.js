const express = require("express");
const app = express();
const PORT = 8080;

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server is available at: http://localhost:${PORT}`)
);

const aboutData = require("./data/dataAbout.json");

app.get("/about", (req, res) => {
  res.status(200).json(aboutData);
});

const homeData = require("./data/homeTable.json");

app.get("/home", (req, res) => {
  res.status(200).json(homeData);
});

app.post("/home", (req, res) => {
  const newHome = req.body;

  let newArray = [...homeData, newHome];

  console.log(newArray);
  res.status(200).json(newArray);
});
