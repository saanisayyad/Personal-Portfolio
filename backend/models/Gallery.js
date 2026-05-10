import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  public_id: {
    type: String
  },
  
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);