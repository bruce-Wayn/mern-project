const express = require("express");
const app = express();
const UserModel = require("./models/Users");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/mernTest")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/getUsers", async (request, response) => {
  try {
    const results = await UserModel.find();
    response.send(results);
  } catch (error) {
    console.log(error);
  }
});

app.post("/setUsers", async (request, response) => {
  try {
    const user = request.body;
    const newUser = new UserModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      country: user.country,
      state: user.state,
      city: user.city,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      age: user.age,
    });
    const result = await newUser.save();
    response.json(result);
  } catch (error) {
    console.log(error);
  }
});
const countrySchema = new mongoose.Schema({
  _id: Number,
  country: String,
  state: String,
  city: String
});


const Country = mongoose.model("Country", countrySchema);

app.get("/countries", async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json(countries);
  } catch (error) {
    console.error("Error fetching countries from the database:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(4000, () => {
  console.log("Server has started");
});
