import Skill
  from "../models/Skill.js"

/* CREATE */
export const createSkill =
  async (req, res) => {

    try {

      const skill =
        await Skill.create(
          req.body
        )

      res.status(201).json(
        skill
      )

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* GET */
export const getSkills =
  async (req, res) => {

    try {

      const skills =
        await Skill.find()
        .sort({
          createdAt: -1,
        })

      res.json(skills)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* UPDATE */
export const updateSkill =
  async (req, res) => {

    try {

      const skill =
        await Skill.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        )

      res.json(skill)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }

/* DELETE */
export const deleteSkill =
  async (req, res) => {

    try {

      await Skill.findByIdAndDelete(
        req.params.id
      )

      res.json({
        message:
          "Skill deleted",
      })

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })
    }
  }