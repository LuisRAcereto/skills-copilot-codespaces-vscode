// Create web server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./models");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

// Create a new comment
app.post("/comments", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.send(comment);
  } catch (error) {
    res.status(500).send({
      error: "An error has occured trying to create the comment",
    });
  }
});

// Get all comments
app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      limit: 10,
    });
    res.send(comments);
  } catch (error) {
    res.status(500).send({
      error: "An error has occured trying to fetch the comments",
    });
  }
});

// Get comment by id
app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(comment);
  } catch (error) {
    res.status(500).send({
      error: "An error has occured trying to fetch the comment",
    });
  }
});

// Update comment by id
app.put("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(req.body);
  } catch (error) {
    res.status(500).send({
      error: "An error has occured trying to update the comment",
    });
  }
});

// Delete comment by id
app.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(req.body);
  } catch (error) {
    res.status(500).send({
      error: "An error has occured trying to delete the comment",
    });
  }
});

