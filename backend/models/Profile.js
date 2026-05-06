import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String,
    default: "",
  },

  profileImagePublicId: {
  type: String,
  },

  github: {
    type: String,
    default: "",
  },

  linkedin: {
    type: String,
    default: "",
  },

  instagram: {
    type: String,
    default: "",
  },
  
  resume: {
    type: String,
    default: "",
  },

}, { timestamps: true })

export default mongoose.model("Profile", profileSchema)