import Education
  from "../models/Education.js"

/* CREATE */
export const createEducation =
  async (req, res) => {

    try {

      const education =
        await Education.create(
          req.body
        )

      res.status(201).json(
        education
      )

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* GET ALL */
export const getEducation =
  async (req, res) => {

    try {

      const education =
        await Education.find()
        .sort({
          createdAt: -1,
        })

      res.json(education)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* UPDATE */
export const updateEducation =
  async (req, res) => {

    try {

      const education =
        await Education.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        )

      res.json(education)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* DELETE */
export const deleteEducation =
  async (req, res) => {

    try {

      await Education.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          "Education deleted",
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }