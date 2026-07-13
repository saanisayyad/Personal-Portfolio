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

      // Preload first few images
      data.slice(0, 4).forEach((project) => {
        if (project.images?.[0]?.imageUrl) {
          const image = new Image();
          image.src = project.images[0].imageUrl;
        }
      });

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
      transition-all
      duration-300
      hover:border-cyan-500/30
    "
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block h-full"
                    >
                      {/* IMAGE */}
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <ProgressiveImage
                          src={project.images?.[0]?.imageUrl?.replace(
                            "/upload/",
                            "/upload/f_auto,q_auto,w_800/",
                          )}
                          alt={project.title}
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
                          <div className="absolute top-4 right-4 bg-yellow-500 text-black p-2 rounded-full shadow-lg">
                            <Star size={16} />
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-5 flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-3 line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-zinc-400 text-sm text-justify leading-relaxed line-clamp-3 mb-4">
                          {project.shortDescription}
                        </p>

                        {project.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.techStack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="
                    px-3
                    py-1
                    rounded-full
                    bg-zinc-800
                    text-cyan-400
                    text-xs
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
