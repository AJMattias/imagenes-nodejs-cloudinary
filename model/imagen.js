const mongoose = require("mongoose")

const ImagenSchema =mongoose.Schema({
    idCloudinary:{
        type: String,
    },
    url:{
        type: String
    },
    fechaCreacion:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Imagen", ImagenSchema)