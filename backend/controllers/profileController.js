import Profile from "../models/Profile.js"

import cloudinary from "../config/cloudinary.js"

import fs from "fs"

import path from "path"

// GET PROFILE
export const getProfile =
  async (req, res) => {

    try {

      const profile =
        await Profile.findOne()

      res.status(200).json(
        profile
      )

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
}

// UPDATE PROFILE
export const updateProfile =
  async (req, res) => {

    try {

      const existingProfile =
        await Profile.findOne()

      const updatedData = {

        name: req.body.name,

        title: req.body.title,

        bio: req.body.bio,

        github: req.body.github,

        linkedin:
          req.body.linkedin,
        
        instagram:
          req.body.instagram,
      }

      // PROFILE IMAGE
      if (
        req.files?.
        profileImage
      ) {

        // Delete old image from Cloudinary
        if (
          existingProfile?.
          profileImagePublicId
        ) {

          await cloudinary
            .uploader
            .destroy(
              existingProfile
                .profileImagePublicId
            )
        }

        updatedData.profileImage =
          req.files
            .profileImage[0]
            .path

        updatedData.profileImagePublicId =
          req.files
            .profileImage[0]
            .filename
      }

      // RESUME PDF
      if (
        req.files?.resume
      ) {

        // Delete old resume
        if (
          existingProfile?.
          resume
        ) {

          const oldResumePath =
            path.join(
              process.cwd(),
              existingProfile
                .resume
            )

          if (
            fs.existsSync(
              oldResumePath
            )
          ) {

            fs.unlinkSync(
              oldResumePath
            )
          }
        }

        updatedData.resume =
          `/uploads/resumes/${
            req.files
              .resume[0]
              .filename
          }`
      }

      const updatedProfile =
        await Profile
          .findOneAndUpdate(
            {},
            updatedData,
            {
              new: true,
              upsert: true,
            }
          )

      res.status(200).json(
        updatedProfile
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message:
          error.message,
      })
    }
}