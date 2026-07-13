import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      liveUrl,
      githubUrl,
      techStack,
      featured,
      projectType,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    if (req.files.length > 3) {
      return res.status(400).json({
        message: "Maximum 3 images allowed",
      });
    }

    const images = req.files.map((file) => ({
      imageUrl: file.path,
      public_id: file.filename,
    }));

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const project = await Project.create({
      title,
      shortDescription,
      description,
      images,
      liveUrl,
      githubUrl,
      techStack: Array.isArray(techStack)
        ? techStack
        : techStack
            ?.split(",")
            .map((item) => item.trim()),
      featured:
        featured === true ||
        featured === "true",
      projectType,
      slug,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      featured: -1,
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE PROJECT BY SLUG
export const getProjectBySlug = async (
  req,
  res
) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (
  req,
  res
) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const {
      title,
      shortDescription,
      description,
      liveUrl,
      githubUrl,
      techStack,
      featured,
      projectType,
    } = req.body;

    // Upload new images if provided
    let images = project.images;

    if (
      req.files &&
      req.files.length > 0
    ) {
      // Delete old Cloudinary images
      for (const image of project.images) {
        if (image.public_id) {
          await cloudinary.uploader.destroy(
            image.public_id
          );
        }
      }

      images = req.files.map((file) => ({
        imageUrl: file.path,
        public_id: file.filename,
      }));
    }

    const slug = title
      ? title
          .toLowerCase()
          .trim()
          .replace(
            /[^a-z0-9\s-]/g,
            ""
          )
          .replace(/\s+/g, "-")
      : project.slug;

    project.title =
      title || project.title;

    project.shortDescription =
      shortDescription ||
      project.shortDescription;

    project.description =
      description ||
      project.description;

    project.liveUrl =
      liveUrl || project.liveUrl;

    project.githubUrl =
      githubUrl || project.githubUrl;

    project.projectType =
      projectType ||
      project.projectType;

    project.featured =
      featured !== undefined
        ? featured === true ||
          featured === "true"
        : project.featured;

    project.slug = slug;

    project.images = images;

    if (techStack) {
      project.techStack =
        Array.isArray(techStack)
          ? techStack
          : techStack
              .split(",")
              .map((item) =>
                item.trim()
              );
    }

    const updatedProject =
      await project.save();

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PROJECT
export const deleteProject = async (
  req,
  res
) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Delete all Cloudinary images
    for (const image of project.images) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(
          image.public_id
        );
      }
    }

    await project.deleteOne();

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};