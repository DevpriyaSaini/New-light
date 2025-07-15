import { footer } from 'motion/react-client'
import React from 'react'

function Footer() {
  return (
      <footer  id="contact"className="bg-black text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
    {/* About Us Section */}
    <div className="space-y-4">
      <h2 className="text-white text-lg font-semibold">About Us</h2>
      <p className="text-sm leading-relaxed">
        Music School is a premier institution dedicated to teaching the art
        and science of music. We nurture talent from the ground up,
        fostering a vibrant community of musicians.
      </p>
    </div>

    {/* Quick Links Section */}
    <div className="space-y-4">
      <h2 className="text-white text-lg font-semibold">Quick Links</h2>
      <ul className="space-y-2">
        {['Home', 'About', 'Courses', 'Contact', 'Blog'].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Follow Us Section */}
    <div className="space-y-4">
      <h2 className="text-white text-lg font-semibold">Follow Us</h2>
      <div className="flex flex-wrap gap-4">
        {['Facebook', 'Twitter', 'Instagram', 'YouTube', 'LinkedIn'].map((social) => (
          <a
            key={social}
            href="#"
            className="text-sm hover:text-white transition-colors duration-200"
          >
            {social}
          </a>
        ))}
      </div>
    </div>

    {/* Contact Us Section */}
    <div className="space-y-4">
      <h2 className="text-white text-lg font-semibold">Contact Us</h2>
      <address className="not-italic text-sm space-y-2">
        <p>123 Music Avenue, UP, India</p>
        <p>Phone: +91-1234567891</p>
        <p>love@dev.com</p>
        <p>Hours: Mon-Fri 9AM-6PM</p>
      </address>
    </div>
  </div>

  {/* Copyright Section */}
  <div className="border-t border-gray-800 mt-12 pt-8 text-center">
    <p className="text-xs text-gray-500">
      © {new Date().getFullYear()} Music School. All rights reserved. | 
      <a href="#" className="hover:text-white ml-2">Privacy Policy</a> | 
      <a href="#" className="hover:text-white ml-2">Terms of Service</a>
    </p>
  </div>
</footer>
  )
}

export default Footer