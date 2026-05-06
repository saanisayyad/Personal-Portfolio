import Language
  from "../models/Language.js"

/* CREATE */
export const createLanguage =
  async (req, res) => {

    try {

      const language =
        await Language.create(
          req.body
        )

      res.status(201).json(
        language
      )

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* GET */
export const getLanguages =
  async (req, res) => {

    try {

      const languages =
        await Language.find()
        .sort({
          createdAt: -1,
        })

      res.json(languages)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* UPDATE */
export const updateLanguage =
  async (req, res) => {

    try {

      const language =
        await Language.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        )

      res.json(language)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* DELETE */
export const deleteLanguage =
  async (req, res) => {

    try {

      await Language.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          "Language deleted",
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }