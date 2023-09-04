const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {mongoConnection} = require("./utils/mongoConnection")
const verifyToken = require("./utils/verifyToken")
const { handleError } = require("./utils/error")

const app = express()

app.use(express.json())
dotenv.config()
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log("Server connected");
});

// Routes
const AuthRoutes = require("./routes/AuthRoutes")

app.use(verifyToken)

app.use(handleError)

mongoConnection