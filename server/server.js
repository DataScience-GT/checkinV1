//load express stuff
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5069;

//load other things
const generateApiKey = require("generate-api-key");

//load the database
const db = require("./db/database.js");
var md5 = require("md5");

// Where we will keep books
let books = {
  isbn: "9781593275846",
  title: "Eloquent JavaScript, Second Edition",
  author: "Marijn Haverbeke",
  publish_date: "2014-12-14",
  publisher: "No Starch Press",
  numOfPages: "472",
};

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//---------------------------------

function checkAPIkey(key, requiredScope) {
  let hash1 = md5(key);
  //verify key
  let sql = `SELECT scopes FROM api_keys WHERE key = '${hash1}'`;
  db.all(sql, (err, rows) => {
    if (err) {
      //res.status(400).json({ error: err.message });
      return err.message;
    }
    if (rows.length <= 0) {
      //res.status(400).json({ error: "API Key does not exist" });
      return "API Key does not exist";
    }
    if (rows.length > 1) {
      //res.status(400).json({ error: "duplicate API Keys exist" });
      return "duplicate API Keys exist";
    }
    //verify scope
    if (!hasScope(rows, requiredScope)) {
      //res.status(400).json({ error: "Key scope does not allow this request" });
      return "Key scope does not allow this request";
    }
    return;
  });
}

function hasScope(rows, required) {
  let row = rows[0];
  let scopes = new Array(row.scopes.split(","));

  if (required == "*") {
    //master
    if (
      (scopes.length > 1 && scopes.includes("*")) ||
      (scopes.length == 1 && scopes == "*")
    ) {
      return true;
    }
  } else if (required.includes(".")) {
    //required.*
    if (
      (scopes.length > 1 && scopes.includes(required.split(".")[0] + ".*")) ||
      (scopes.length == 1 && scopes == required.split(".")[0] + ".*")
    ) {
      return true;
    }
    //required.required
    if (
      (scopes.length > 1 && scopes.includes(required)) ||
      (scopes.length == 1 && scopes == required)
    ) {
      return true;
    }
  }

  //incorrect scope or error
  return false;
}

//-----------------requests---------------

app.get("/api/keys/:key/list", (req, res) => {
  let key = req.params.key;
  let err = checkAPIkey(key, "keys.list");
  if (err) {
    res.status(400).json({ error: err });
    return;
  }

  //get all api keys
  var sql = "select * from api_keys";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/keys/:key/generatemaster", (req, res) => {
  let key = req.params.key;
  let err = checkAPIkey(key, "*");
  if (err) {
    res.status(400).json({ error: err });
    return;
  }

  //generate new key
  let prefix = generateApiKey({ method: "bytes", length: 7 });
  let affix = generateApiKey({ method: "bytes", length: 20 });
  let apikey = prefix + "." + affix;
  let hash2 = md5(apikey);
  var sql = `INSERT INTO api_keys (name, prefix, key, scopes) VALUES ('Master', '${prefix}', '${hash2}', '*');`;
  db.run(sql, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      apikey: apikey,
    });
  });
});

app.get("/api/keys/:key/test", (req, res) => {
  let key = req.params.key;
  let hash = md5(key);
  //verify key
  let sql = `SELECT scopes FROM api_keys WHERE key = '${hash}'`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows.length <= 0) {
      res.status(400).json({ error: "API Key does not exist" });
      return;
    }
    if (rows.length > 1) {
      res.status(400).json({ error: "duplicate API Keys exist" });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

//---------------end of requests----------
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
