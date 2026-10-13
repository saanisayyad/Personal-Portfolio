const GlassCard = ({
  children,
  className = "",
}) => {

  return (

    <div
      className={`
      group
      relative
      overflow-hidden
      rounded-[2rem]
      border
      border-zinc-800
      bg-zinc-900/40
      backdrop-blur-xl
      transition-all
      duration-500
      hover:border-cyan-400/30
      hover:-translate-y-1
      ${className}
      `}
    >

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />

      <div className="relative z-10 h-full">

        {children}

      </div>

    </div>

  )
}

export default GlassCard