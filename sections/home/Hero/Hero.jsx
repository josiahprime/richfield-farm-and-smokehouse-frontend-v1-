import Link from "next/link"

const Hero = () => {
  return (
    <>
    <div className="font-sans bg-white px-5 md:px-14 py-12 overflow-hidden">
      <div className="max-w-7xl max-md:max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div>
            <h2 className="text-gray-800 lg:text-5xl md:text-4xl text-3xl font-bold mb-4 lg:!leading-[55px]">Farm Produce Delivered to Your Doorstep.</h2>
            <p className="text-gray-700 mt-6 text-base leading-relaxed">Experience the freshest catch and handpicked farm produce, delivered straight from our fields and waters to your table. Shop with ease, support sustainability, and enjoy the best nature has to offer.</p>
            <div className="mt-10">
              <Link href='/'
                className="bg-[#153d38] hover:bg-[#0c2523] transition-all text-white font-bold text-sm rounded-full px-5 py-4"
                >
                  Start Shopping
              </Link>
            </div>
          </div>

          <div>
            <img src='/assets/fruit2.png' className="shrink-0 w-full h-full md:-rotate-1 rounded-md object-contain" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Hero