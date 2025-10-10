"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] w-full">
        <Image
          src="/assets/contact.jpg"
          alt="Contact Background"
          fill
          className="object-cover"
          priority
        />
    

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-20 text-white"
        >
          <h2 className="text-sm md:text-base mb-2 tracking-wide">HOME / CONTACT</h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Contact Us</h1>
        </motion.div>
      </section>

      {/* Main Contact Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gray-50 rounded-lg p-8 shadow-md"
          >
            <h2 className="text-3xl font-bold text-[#29746b] mb-6">Get in touch</h2>
            <p className="text-gray-600 mb-8 text-sm">
              Feel free to contact us and we will get back to you as soon as possible
            </p>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-sm focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-sm focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full p-3 rounded-lg bg-white border border-gray-200 text-sm focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full text-sm bg-[#29746b] hover:bg-[#143834] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Send
              </button>
            </form>
          </motion.div>

          {/* Contact Info and Hours */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-semibold text-[#29746b] mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Image src="/assets/location.svg" alt="Location icon" width={20} height={20} />
                  <div>
                    <h4 className="font-semibold text-[#29746b] text-sm mb-1">Our Location</h4>
                    <p className="text-gray-600 text-sm">123 Business Street</p>
                    <p className="text-gray-600 text-sm">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Image src="/assets/phone.svg" alt="Phone icon" width={20} height={20} />
                  <div>
                    <h4 className="font-semibold text-[#29746b] text-sm mb-1">Phone Number</h4>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Image src="/assets/email.svg" alt="Email icon" width={20} height={20} />
                  <div>
                    <h4 className="font-semibold text-[#29746b] text-sm mb-1">Email Address</h4>
                    <p className="text-gray-600 text-sm">contact@business.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours of Operation */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-[#29746b] mb-6">Hours of Operation</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-gray-900">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
