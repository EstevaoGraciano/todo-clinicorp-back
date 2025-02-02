const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { setTaskRoutes } = require("./controller/task.js");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extendend: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("TODO List - Estêvão Graciano");
});

setTaskRoutes(app);

app.listen(port, () => console.log(`Server running at port ${port}`));
