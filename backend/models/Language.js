import mongoose from "mongoose"

const languageSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    proficiency: {
      type: String,
      required: true,
    },

  }, {
    timestamps: true,
  })

export default mongoose.model(
  "Language",
  languageSchema
)