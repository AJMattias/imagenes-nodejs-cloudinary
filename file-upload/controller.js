const cloudinary = require("../utilities/upload");
const Imagen = require("../model/imagen");
 
exports.upload_file = async (req, res) => {
  const file = req.files.image;
 
  try {
    if (!file) {
      return res.status(404).json({ error: 'No File Selected' });
    }
    // if(req.files.image){
    //   res.status(200).json({msg: "image getted"})
    // }
    console.log("image goted from controller before upload")
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    //res.send("File uploaded")
 
    return res.status(200).send({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.delete_file = async (req, res) => {
  const idFile = req.params.id
  try {
    if (!idFile) {
      return res.status(404).json({ error: 'No File Selected' });
    }
  
    //delete image by id in cloudinary
    const {result} = cloudinary.uploader.destroy(idFile, function(result){
      console.log(result)
    });

    await Imagen.deleteOne({_id: idFile});
    return res.status(200).json({ msg: 'File succesfully deleted' });

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.create_image = async (req, res) =>{
  const file = req.files.image;
  //console.log(file);
    //const {id, url, fechaCreacion} = req.body
    let result_image;
    let imagen = new Imagen();
    try {
        if (!file) {
            return res.status(404).json({ error: 'No File Selected. Please select an file and try' });
        }
        if(file){
        console.log("image to be save")}
        result_image = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
        });
        // Create Image in the database with all data that we have and add to it the
        // image information that we get from Cloudinary
        console.log("image info to be save")
        //image.fechaCreacion =new Date().getTime;
        
        imagen = await Imagen.create({
          idCloudinary : result_image.public_id,
          url : result_image.secure_url
        })

        res.status(200).json(imagen)

    } catch (error) {
        return res.status(500).send(error.message);  
    }

}

//endpoint for get image by id
//example of http request for this endpoint:
//http://localhost:3000/image/65abd4c0eca5a256f2bc4236
exports.getImageById = async (req, res) => {
  const id = (req.params.id).trim();
  
  try {
    
    let imagen = await Imagen.findById(id);

    if(!imagen){
      res.status(404).json({msg: 'No existe el producto'});
    }

    res.json(imagen)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"imagen no encontrada, intenta con otra imagen"})
  }
}

exports.getAll = async(req, res) =>{
  console.log("get all images")
  try {
    const imagenes = await Imagen.find();
    res.json(imagenes)
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"hubo un error, intente nuevamente mas tarde"})

  }
}