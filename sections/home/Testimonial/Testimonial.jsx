"use client"

import { useEffect, useState } from "react";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchedTestimonials = [
      {
        name: 'David Turner',
        jobTitle: 'Food Blogger at Everyday Delights:',
        profile: '/assets/profilepic01.jpg',
        message:
          'I love shopping here for my weekly groceries! The farm-fresh produce is vibrant and flavorful, making my meals healthier and tastier. This site has become my go-to for quality ingredients',
        rating: '/assets/ratings/rating-40.png',
      },
      {
        name: 'Maria Gonzalez',
        jobTitle: 'Executive Chef at Green Plate Bistro',
        profile: '/assets/profilepic02.jpg',
        message:
          '"The freshness of the ingredients has transformed my dishes. Every vegetable and fish is top-quality. I highly recommend their products to any chef seeking excellence.',
        rating: '/assets/ratings/rating-45.png',
      },
      {
        name: 'Sophia Carter',
        jobTitle: 'Nutritionist, Wellness Center',
        profile: 'https://readymadeui.com/team-3.webp',
        message:
          "Thanks to RichField's reliable products, I can confidently recommend healthy and sustainable options to my clients. Their commitment to quality and innovation sets them apart in the industry",
        rating: '/assets/ratings/rating-45.png',
      },
    ];

    setTestimonials(fetchedTestimonials);
  }, []);

  return (
    <div className="p-4 my-10 font-[sans-serif] max-w-6xl max-lg:max-w-3xl max-md:max-w-xl mx-auto">
      <div className="max-w-2xl">
        <h2 className="text-gray-800 text-2xl font-bold md:text-3xl">What our happy client say</h2>
        <p className="text-sm text-gray-500 mt-4 leading-relaxed">
          Our clients rave about the quality and freshness of our products. They appreciate the dedication we put into sourcing the best ingredients. With every order, we strive to exceed their expectations and provide an exceptional experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-md:justify-center mt-12">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="border border-gray-300 lg:p-6 p-4 rounded-xl bg-white relative">
            <div className="flex items-center">
              <img src={testimonial.profile} className="w-14 h-14 rounded-full border border-teal-600" />
              <div className="ml-4">
                <h6 className="text-gray-800 text-sm font-semibold">{testimonial.name}</h6>
                <p className="text-xs text-gray-500 mt-1">{testimonial.jobTitle}</p>
              </div>
            </div>

            <hr className="rounded-full border-2 mt-6" />

            <div className="mt-6">
              <p className="text-gray-800 text-sm leading-relaxed">{testimonial.message}</p>
            </div>

            <div className="flex space-x-1 mt-4">
              <img src={testimonial.rating} className="w-22 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
