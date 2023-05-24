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
    console.log("mongodb connected");
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
    const newUser = new UserModel(user);
    const result = await newUser.save();
    response.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(4000, () => {
  console.log("server has started");
});
