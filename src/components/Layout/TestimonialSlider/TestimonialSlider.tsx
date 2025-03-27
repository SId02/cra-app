
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const TestimonialSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const testimonials = [
        {
            name: "Jagan Mohan",
            position: "CEO, ABC Inc.",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
        },
        {
            name: "Jatin K",
            position: "COO, YU Inc.",
            text: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
        },
        {
            name: "Aditya Desai",
            position: "CTO, AAAD.",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.consectetur adipiscing elit. Integer nec odio. Praesent libero.consectetur adipiscing elit.",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <>
        <div className="container mx-auto p-5">
            <h3 className="text-center text-2xl font-semibold mb-5">Testimonial Slider</h3>
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <div className="testimonial-content mb-4">
                            <p className="text-lg">{testimonials[currentSlide].text}</p>
                            <p className="text-gray-600 mt-2">
                                {testimonials[currentSlide].name} - {testimonials[currentSlide].position}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={prevSlide}>
                                Previous
                            </button>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={nextSlide}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          <footer className="flex justify-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
              Back to Home
          </Link>
      </footer>
        </>
    );
};

export default TestimonialSlider;
