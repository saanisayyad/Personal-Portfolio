import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// UPLOAD MULTIPLE IMAGES
export const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      // Generate title from file name
      const title = file.originalname
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const image = await Gallery.create({
        imageUrl: file.path,
        public_id: file.filename,
        title,
      });

      uploadedImages.push(image);
    }

    res.status(201).json(uploadedImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL IMAGES
export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE IMAGE
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await image.deleteOne();

    res.json({
      message: "Image deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};