import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  ExternalLink,
  Star,
} from "lucide-react";

import { getProjectBySlug } from "../../services/projectService";

import ProgressiveImage from "../../components/ui/ProgressiveImage";
import { FaGithub } from "react-icons/fa";

const ProjectDetails = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);

  const fetchProject = async () => {
    try {
      const data = await getProjectBySlug(slug);

      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [slug]);

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <div className="w-14 h-14 border-4 border-t-cyan-500 border-zinc-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <section className="relative min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-10"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Card */}
        <motion.article
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-10 lg:p-14"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          {/* Top Meta */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/70 border border-zinc-700 text-cyan-400 text-xs uppercase tracking-[0.2em]">
              <FolderKanban size={14} />
              Project
            </div>

            {project.featured && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs uppercase tracking-[0.2em]">
                <Star size={14} />
                Featured
              </div>
            )}

            <div className="inline-flex items-center gap-2 text-zinc-500 text-sm">
              <CalendarDays size={16} />

              {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Title */}
          <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-6">
            {project.title}
          </h1>

          {/* Short Description */}
          <p className="relative z-10 text-zinc-400 text-justify text-lg sm:text-xl mb-10 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Hero Image */}
          {project.images?.length > 0 && (
            <>
              <div className="relative z-10 overflow-hidden rounded-[2rem] border border-zinc-800 mb-6">
                <ProgressiveImage
                  src={project.images?.[activeImage]?.imageUrl?.replace(
                    "/upload/",
                    "/upload/f_auto,q_auto,w_1200/",
                  )}
                  alt={project.title}
                  className="w-full max-h-[650px] object-cover"
                />
              </div>

              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div className="relative z-10 flex gap-3 overflow-x-auto mb-10 pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`
                          flex-shrink-0
                          overflow-hidden
                          rounded-xl
                          border-2
                          transition-all
                          ${
                            activeImage === index
                              ? "border-cyan-400"
                              : "border-zinc-800"
                          }
                        `}
                    >
                      <img
                        src={image.imageUrl}
                        alt=""
                        className="w-24 h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Divider */}
          <div className="relative z-10 h-px w-full bg-gradient-to-r from-cyan-500/30 via-zinc-800 to-blue-500/30 mb-10" />

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className="relative z-10 mb-10">
              <h2 className="text-xl font-bold mb-5">Tech Arsenal</h2>

              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="
                        px-4
                        py-2
                        rounded-full
                        bg-zinc-800/70
                        border
                        border-zinc-700
                        text-cyan-400
                        text-sm
                      "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-5">Project Overview</h2>

            <p
              className="
                text-zinc-300
                leading-[2.1]
                whitespace-pre-wrap
                text-base
                sm:text-lg
                lg:text-xl
                text-justify
              "
            >
              {project.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="relative z-10 flex flex-wrap gap-4 mt-12">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  bg-white
                  text-black
                  font-semibold
                  hover:scale-105
                  transition-all
                "
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-zinc-700
                  hover:bg-zinc-800
                  transition-all
                "
              >
                <FaGithub size={18} />
                GitHub
              </a>
            )}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ProjectDetails;
