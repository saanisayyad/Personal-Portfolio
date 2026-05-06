import Hobby
  from "../models/Hobby.js"

/* CREATE */
export const createHobby =
  async (req, res) => {

    try {

      const hobby =
        await Hobby.create(
          req.body
        )

      res.status(201).json(
        hobby
      )

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* GET */
export const getHobbies =
  async (req, res) => {

    try {

      const hobbies =
        await Hobby.find()
        .sort({
          createdAt: -1,
        })

      res.json(hobbies)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* UPDATE */
export const updateHobby =
  async (req, res) => {

    try {

      const hobby =
        await Hobby.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        )

      res.json(hobby)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* DELETE */
export const deleteHobby =
  async (req, res) => {

    try {

      await Hobby.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          "Hobby deleted",
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }