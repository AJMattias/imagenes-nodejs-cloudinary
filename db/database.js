const mongoose = require("mongoose");

const connectionDB = async() => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/imagenes', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('database connected')
    } catch (error) {
        console.log(error);
        process.exit(1)// detenemos la app
    }
}

module.exports = connectionDB;