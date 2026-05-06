import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// UPLOAD IMAGE
export const uploadImage = async (req, res) => {
  try {
    const image = await Gallery.create({
      imageUrl: req.file.path,
      public_id: req.file.filename,
      title: req.body.title
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL IMAGES
export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE IMAGE
export const deleteImage =
  async (req, res) => {

    try {

      console.log(req.params.id)

      const image =
        await Gallery.findById(
          req.params.id
        )

      console.log(image)

      await cloudinary.uploader.destroy(
        image.public_id
      )

      await image.deleteOne()

      res.json({
        message: "Image deleted"
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: error.message
      })
    }
}