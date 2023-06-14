const express = require("express");
const addRoutes = require("./routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
addRoutes(app);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
