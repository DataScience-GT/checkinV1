const express = require("express");
const app = express();
const port = 5069;
app.get("/", (req, res) => {
  res.send("duisah");
});
app.get("/api/eventcheckin/:event/:uuid", (req, res) => {
  let event = req.params.event;
  let uuid = req.params.uuid;
  res.json(JSON.stringify({"eventname": event, "uuid": uuid}) || {});
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
