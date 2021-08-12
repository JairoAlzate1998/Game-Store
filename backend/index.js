const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => 
    console.log("Backend server running in port: ", process.env.PORT)
);

dbConnection();