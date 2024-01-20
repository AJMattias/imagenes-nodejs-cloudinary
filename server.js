const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const uploadRoute = require("./file-upload/router");
const connectionDB = require("./db/database")

const app = express();
connectionDB();

dotenv.config();

app.use(express.json());
app.use(
    cors({
        origins: "*"
    })
);
app.use(fileUpload({useTempFiles: true}));

app.get("/", (req, res) =>{
    res.status(200).json({msg: "Servidor esta funcionando"})
})

app.use("/image", uploadRoute)

app.listen(process.env.PORT  || 3000, () => {
    console.log( `Server is up and running on port ${process.env.PORT}` )
})