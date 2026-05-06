const SectionTitle = ({
  title,
}) => {

  return (

    <div className="flex items-center gap-4 mb-16">

      <div className="w-14 h-[1px] bg-gradient-to-r from-pink-500 to-orange-500" />

      <h2 className="text-4xl font-black">

        {title}

      </h2>

    </div>

  )
}

export default SectionTitle