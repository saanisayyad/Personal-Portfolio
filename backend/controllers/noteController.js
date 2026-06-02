import Note from "../models/Note.js";
import slugify from "slugify";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    const note = await Note.create({
      title,
      content,
      slug,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL NOTES
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE NOTE
export const getNoteBySlug = async (
  req,
  res
) => {
  try {
    const note = await Note.findOne({
      slug: req.params.slug,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE NOTE
export const updateNote = async (
  req,
  res
) => {
  try {
    const { title, content } =
      req.body;

    const updatedData = {
      title,
      content,
    };

    if (title) {
      updatedData.slug =
        slugify(title, {
          lower: true,
          strict: true,
          trim: true,
        });
    }

    const note =
      await Note.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};