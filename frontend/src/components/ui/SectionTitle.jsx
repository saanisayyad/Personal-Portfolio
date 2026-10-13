const SectionTitle = ({ title }) => {
  return (
    <div className="mb-10 flex items-center gap-4 sm:mb-12">
      <span className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-300 to-violet-500" />
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
