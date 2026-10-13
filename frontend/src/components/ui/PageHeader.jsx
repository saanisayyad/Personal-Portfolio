import { motion } from "framer-motion";

const PageHeader = ({ badge, title, description, icon: Icon }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto mb-20 max-w-4xl text-center sm:mb-24"
    >
      <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-300/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.19em] text-cyan-200">
        {Icon && <Icon size={14} strokeWidth={1.8} />}
        <span>{badge}</span>
      </div>

      <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
        {title}
      </h1>

      <div className="mx-auto my-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />

      <p className="mx-auto max-w-2xl text-pretty text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
        {description}
      </p>
    </motion.header>
  );
};

export default PageHeader;
