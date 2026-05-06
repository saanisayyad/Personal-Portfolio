import {
  motion,
} from "framer-motion"

const PageHeader = ({
  badge,
  title,
  description,
  icon: Icon,
}) => {

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 30,
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
      }}
      className="text-center mb-24"
    >

      {/* Badge */}
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-pink-500/20 bg-white/5 backdrop-blur-md text-pink-400 text-xs uppercase tracking-[0.25em] mb-8">

        {Icon && (
          <Icon size={14} />
        )}

        {badge}

      </div>

      {/* Title */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-white via-pink-200 to-orange-300 bg-clip-text text-transparent mb-8">

        {title}

      </h1>

      {/* Description */}
      <p className="max-w-3xl mx-auto text-zinc-500 text-base sm:text-lg leading-relaxed">

        {description}

      </p>

    </motion.div>

  )
}

export default PageHeader