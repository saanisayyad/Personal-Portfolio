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
      transition-[border-color,background-color,box-shadow,transform]
      duration-300
      hover:border-cyan-400/25
      hover:-translate-y-0.5
      ${className}
      `}
    >

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-violet-500/[0.04]" />

      <div className="relative z-10 h-full">

        {children}

      </div>

    </div>

  )
}

export default GlassCard