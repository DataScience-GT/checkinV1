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

//-----------------requests---------------

app.get("/api/apikeys", (req, res) => {
  var sql = "select * from api_keys";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json(JSON.stringify({ error: err.message }));
      return;
    }
    res.json(
      JSON.stringify({
        message: "success",
        data: rows,
      })
    );
  });
});

app.get("/api/apikeys/:key/generatemaster", (req, res) => {
  let key = req.params.key;
  let hash1 = md5(key);
  //verify key
  let sql = `SELECT scopes FROM api_keys WHERE key = '${hash}'`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json(JSON.stringify({ error: err.message }));
      return;
    }
    if (rows.length <= 0) {
      res.status(400).json(JSON.stringify({ error: "API Key does not exist" }));
      return;
    }
    if (rows.legnth > 1) {
      res
        .status(400)
        .json(JSON.stringify({ error: "duplicate API Keys exist" }));
      return;
    }
    if (!rows.scopes.split(",").include("*")) {
      res
        .status(400)
        .json(
          JSON.stringify({ error: "Key scope does not allow this request" })
        );
      return;
    } else {
      //generate new key
      let prefix = generateApiKey({ method: "bytes", length: 7 });
      let affix = generateApiKey({ method: "bytes", length: 20 });
      let apikey = prefix + "." + affix;
      let hash2 = md5(apikey);
      var sql = `INSERT INTO api_keys (name, prefix, key, scopes) VALUES ('Master', '${prefix}', '${hash2}', '*');`;
      db.run(sql, (err) => {
        if (err) {
          res.status(400).json(JSON.stringify({ error: err.message }));
          return;
        }
        res.json(
          JSON.stringify({
            message: "success",
            apikey: apikey,
          })
        );
      });
    }
  });
});

app.get("/api/apikeys/:key/test", (req, res) => {
  let key = req.params.key;
  let hash = md5(key);
  //verify key
  let sql = `SELECT scopes FROM api_keys WHERE key = '${hash}'`;
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json(JSON.stringify({ error: err.message }));
      return;
    }
    if (rows.length <= 0) {
      res.status(400).json(JSON.stringify({ error: "API Key does not exist" }));
      return;
    }
    if (rows.legnth > 1) {
      res
        .status(400)
        .json(JSON.stringify({ error: "duplicate API Keys exist" }));
      return;
    }
    res.json(
      JSON.stringify({
        message: "success",
        data: rows,
      })
    );
  });
});

//---------------end of requests----------
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
