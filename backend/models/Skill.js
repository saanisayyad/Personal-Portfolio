import mongoose from "mongoose"

const skillSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

  }, {
    timestamps: true,
  })

export default mongoose.model(
  "Skill",
  skillSchema
)