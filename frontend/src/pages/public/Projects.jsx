import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { getProjects } from "../../services/projectService";

import PageHeader from "../../components/ui/PageHeader";
import GlassCard from "../../components/ui/GlassCard";
import ProgressiveImage from "../../components/ui/ProgressiveImage";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          badge="Portfolio Collection"
          title="Projects"
          description="A showcase of featured work, products and digital experiences."
          icon={FolderKanban}
        />

        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full h-72 rounded-[2rem] border border-zinc-800 bg-zinc-900/40 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-zinc-800 rounded-[2rem] text-zinc-500">
            <FolderKanban size={54} className="mb-5 opacity-30" />

            <h2 className="text-2xl font-bold mb-2">No Projects Yet</h2>

            <p className="text-sm text-zinc-600">Projects will appear here.</p>
          </div>
        ) : (
          <>
            {/* DESKTOP LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                  }}
                >
                  <GlassCard
                    className="
      group
      h-full
      overflow-hidden
      border-white/[0.08]
      bg-zinc-900/45
      transition-all
      duration-300
      hover:border-cyan-300/25
      hover:bg-zinc-900/70
    "
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block h-full"
                    >
                      {/* IMAGE */}
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <ProgressiveImage
                          src={project.images?.[0]?.imageUrl}
                          alt={project.title}
                          width={600}
                          priority={index === 0}
                          className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                        />

                        {project.featured && (
                          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-cyan-200/20 bg-zinc-950/80 px-3 py-2 text-cyan-200 shadow-lg backdrop-blur-md">
                            <Star size={15} fill="currentColor" />
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-5 flex flex-col h-full">
                        <h3 className="mb-3 line-clamp-1 text-xl font-semibold tracking-tight text-zinc-100 transition-colors duration-200 group-hover:text-cyan-100">
                          {project.title}
                        </h3>

                        <p className="mb-5 line-clamp-3 text-left text-sm leading-6 text-zinc-400">
                          {project.shortDescription}
                        </p>

                        {project.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.techStack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="
                    rounded-full
                    border border-cyan-300/10
                    bg-cyan-300/[0.055]
                    px-3 py-1.5
                    text-xs font-medium text-cyan-200
                  "
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
