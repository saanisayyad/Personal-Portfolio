const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-3xl
        border border-white/[0.08]
        bg-zinc-900/55
        shadow-[0_12px_40px_rgba(0,0,0,0.12)]
        backdrop-blur-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-cyan-300/25
        hover:shadow-[0_20px_55px_rgba(0,0,0,0.24)]
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.035] via-transparent to-violet-500/[0.045] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GlassCard;
