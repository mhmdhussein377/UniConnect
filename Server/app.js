const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {mongoConnection} = require("./utils/mongoConnection")

const app = express()

app.use(express.json())
dotenv.config()
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log("Server connected");
});

mongoConnection