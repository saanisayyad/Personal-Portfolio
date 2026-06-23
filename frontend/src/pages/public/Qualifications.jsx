// pages/public/Qualifications.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  GraduationCap,
  Code2,
  Languages,
  Sparkles,
} from "lucide-react";

import { getEducation } from "../../services/educationService";
import { getSkills } from "../../services/skillService";
import { getLanguages } from "../../services/languageService";
import { getHobbies } from "../../services/hobbyService";

import PageHeader from "../../components/ui/PageHeader";
import SectionTitle from "../../components/ui/SectionTitle";
import GlassCard from "../../components/ui/GlassCard";

const Qualifications = () => {
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [
        educationData,
        skillsData,
        languagesData,
        hobbiesData,
      ] = await Promise.all([
        getEducation(),
        getSkills(),
        getLanguages(),
        getHobbies(),
      ]);

      setEducation(educationData);
      setSkills(skillsData);
      setLanguages(languagesData);
      setHobbies(hobbiesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardStyles =
    "p-6 sm:p-7 h-full flex flex-col";

  const iconStyles =
    "w-14 h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700 flex items-center justify-center mb-6";

  return (
    <section className="relative min-h-screen text-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* BACKGROUND GLOWS */}
      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-[500px]
        h-[500px]
        bg-pink-500/10
        blur-[140px]
        rounded-full
        pointer-events-none
      "
      />

      <div
        className="
        absolute
        bottom-0
        right-0
        w-[400px]
        h-[400px]
        bg-orange-500/10
        blur-[140px]
        rounded-full
        pointer-events-none
      "
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <PageHeader
          badge="Qualifications"
          title="Experience & Skills"
          description="
          A complete overview of educational
          background, technical expertise,
          languages and interests.
          "
          icon={GraduationCap}
        />

        {loading ? (
          <div className="space-y-20">
            {/* Education Skeleton */}
            <section>
              <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse mb-6" />

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-40 rounded-3xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
                  />
                ))}
              </div>
            </section>

            {/* Skills Skeleton */}
            <section>
              <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse mb-6" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-72 rounded-3xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
                  />
                ))}
              </div>
            </section>

            {/* Languages Skeleton */}
            <section>
              <div className="h-8 w-40 bg-zinc-800 rounded animate-pulse mb-6" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-56 rounded-3xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
                  />
                ))}
              </div>
            </section>

            {/* Hobbies Skeleton */}
            <section>
              <div className="h-8 w-56 bg-zinc-800 rounded animate-pulse mb-6" />

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 rounded-3xl border border-zinc-800 bg-zinc-900/40 animate-pulse"
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <>
            {/* EDUCATION */}
            <section className="mb-32">
              <SectionTitle title="Education" />

              <p className="text-zinc-500 mb-14 max-w-2xl leading-relaxed">
                My academic journey and educational background.
              </p>

              <div className="relative border-l border-pink-500/20 ml-4 space-y-14">
                {education.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                    }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-[-12px] top-2 w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg shadow-pink-500/40" />

                    <GlassCard className="p-6 sm:p-8">
                      <h3 className="text-3xl font-black bg-gradient-to-r from-white via-pink-200 to-orange-300 bg-clip-text text-transparent mb-3">
                        {item.degree}
                      </h3>

                      <p className="text-zinc-300 text-lg mb-5">
                        {item.institution}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-sm text-zinc-300">
                          {item.year}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-sm text-pink-300">
                          {item.score}
                        </span>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SKILLS */}
            <section className="mb-32">
              <SectionTitle title="Skills" />

              <p className="text-zinc-500 mb-14 max-w-2xl leading-relaxed">
                Technologies and tools I have used.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-justify">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill._id}
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
                      duration: 0.7,
                      delay: index * 0.08,
                    }}
                  >
                    <GlassCard className={cardStyles}>
                      <div className={`${iconStyles} text-blue-400`}>
                        <Code2 size={24} />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">
                        {skill.name}
                      </h3>

                      <div className="w-16 h-1 rounded-full bg-blue-500/50 mb-5" />

                      <p className="text-zinc-400 leading-relaxed text-sm mt-auto">
                        {skill.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* LANGUAGES */}
            <section className="mb-32">
              <SectionTitle title="Languages" />

              <p className="text-zinc-500 mb-14 max-w-2xl leading-relaxed">
                Languages I use for communication, collaboration and learning.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {languages.map((language, index) => (
                  <motion.div
                    key={language._id}
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
                      duration: 0.7,
                      delay: index * 0.08,
                    }}
                  >
                    <GlassCard className={cardStyles}>
                      <div className={`${iconStyles} text-emerald-400`}>
                        <Languages size={24} />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">
                        {language.name}
                      </h3>

                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          {language.proficiency}
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* HOBBIES */}
            <section>
              <SectionTitle title="Hobbies & Interests" />

              <p className="text-zinc-500 mb-14 max-w-2xl leading-relaxed">
                Activities and interests that inspire creativity, curiosity and
                balance beyond coding.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-justify">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={hobby._id}
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
                      duration: 0.7,
                      delay: index * 0.08,
                    }}
                  >
                    <GlassCard className={cardStyles}>
                      <div className={`${iconStyles} text-orange-400`}>
                        <Sparkles size={24} />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-4">
                        {hobby.title}
                      </h3>

                      <p className="text-sm leading-7 text-zinc-400 mt-auto">
                        {hobby.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
};

export default Qualifications;