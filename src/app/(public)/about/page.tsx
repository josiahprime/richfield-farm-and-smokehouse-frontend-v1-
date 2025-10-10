"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      {/* Hero Section with Background Image Using Image Component */}
      <section className="relative h-[85vh] w-full">
        <Image
          src="/assets/about01.png"
          alt="About Background"
          fill
          className="object-cover"
          priority
        />
        

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-end px-6 md:px-24 pb-20 text-white"
        >
          <h2 className="text-sm md:text-base mb-2 tracking-wide">HOME / ABOUT</h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            About Us
          </h1>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 xl:px-24">
          <div className="md:flex md:items-center md:gap-12">
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 grid grid-cols-2 gap-4"
            >
              <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/assets/fruit00.jpg"
                  alt="Fresh Fruits"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hidden md:block">
                <Image
                  src="/assets/fish1.png"
                  alt="Fresh Fishes"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hidden md:block col-span-2">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7lT2RC_9oViBe0jFDXHZYH-AquNzSYAQdA&s"
                  alt="Fruits"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:w-1/2 mt-10 md:mt-0 text-gray-700"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                About Us Lorem Dolor
              </h2>
              <p className="mb-4 leading-relaxed">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
                accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
                aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
              </p>
              <p className="mb-4 leading-relaxed">
                Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
              </p>
              <p className="leading-relaxed">
                Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
