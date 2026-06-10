import express from "express";
import Groq from "groq-sdk";

import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Education from "../models/Education.js";
import Language from "../models/Language.js";
import Hobby from "../models/Hobby.js";
import Note from "../models/Note.js";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const profile = await Profile.findOne();

    const projects = await Project.find()
      .select(
        "title shortDescription description techStack liveUrl githubUrl"
      );

    const skills = await Skill.find()
      .select("name description");

    const education = await Education.find();

    const languages = await Language.find();

    const hobbies = await Hobby.find();

    const notes = await Note.find()
      .select("title slug");

    const portfolioContext = `
PROFILE:
${JSON.stringify(profile)}

PROJECTS:
${JSON.stringify(projects)}

SKILLS:
${JSON.stringify(skills)}

EDUCATION:
${JSON.stringify(education)}

LANGUAGES:
${JSON.stringify(languages)}

HOBBIES:
${JSON.stringify(hobbies)}

NOTES:
${JSON.stringify(notes)}
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are the AI assistant for Mohammadsaani's portfolio website.

Rules:

1. Answer ONLY from the portfolio data provided.

2. If information is missing say:
"I couldn't find that information in the portfolio."

3. Be friendly and professional.

4. When someone asks about projects,
mention technologies used.

5. When someone asks how to contact,
use profile information.

6. Keep answers concise.

Portfolio Data:
${portfolioContext}
`,
          },

          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.5,
      });

    res.json({
      success: true,
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;