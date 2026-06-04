import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        imageUrl: String,
        public_id: String,
      },
    ],

    projectType: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "mobile"],
      default: "fullstack",
    },

    liveUrl: String,

    githubUrl: String,

    techStack: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Project", projectSchema);
