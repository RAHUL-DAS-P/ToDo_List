//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const pg = require("pg");
const pool = require("./db");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", async (req, res) => {
  const allTodos = await pool.query("select * from todo");
  var items = [];
  for (let i = 0; i < allTodos.rowCount; i++) {
    items[i] = allTodos.rows[i].description;
  }
  res.render("list", {listTitle: "Today", newListItems: items});
});

app.post("/", async function(req, res){
  const item = req.body.newItem;
  if(item == "" ) {
    res.redirect("/");
    return;
  }
  const addNewRow = await pool.query("insert into todo(description) values($1)", [item]) ;
  res.redirect("/");
  
});

app.post("/delete", async (req, res) => {
  const description = req.body.checkbox;
  const deleteRow = await pool.query("delete from todo where description=$1", [description]);
  res.redirect("/");
});

app.get("/:custom", async (req, res) => {
  const custom = req.params.custom;
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
