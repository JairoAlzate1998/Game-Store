const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const User = require("./routes/user");
const Product = require("./routes/product");
const Stock = require("./routes/stock");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/user", User);
app.use("/api/product", Product);
app.use("/api/stock", Stock);

app.listen(process.env.PORT, () => 
    console.log("Backend server running in port: ", process.env.PORT)
);

dbConnection();