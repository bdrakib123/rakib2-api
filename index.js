const express = require("express");
const app = express();

app.use("/api", require("./api/scsong"));

app.get("/", (req, res) => {
  res.send("SoundCloud Music API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
