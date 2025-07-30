import React from 'react'

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* School Information */}
        <div className="space-y-4">
          <h2 className="text-white text-xl font-bold">
            <span className="text-purple-400">New Light</span> Public School
          </h2>
          <p className="text-sm leading-relaxed">
            Established in 2000, we are committed to excellence in education, nurturing kids minds to become future leaders and responsible global citizens.
          </p>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Dholamazra,Nakur,S.R.E. India</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold border-b border-purple-500 pb-2 inline-block">Quick Links</h3>
          <ul className="space-y-3">
            {['Home', 'About Us', 'Academics', , 'Achievements'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm hover:text-purple-400 transition-colors duration-200 flex items-center"
                >
                  <svg className="w-3 h-3 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold border-b border-purple-500 pb-2 inline-block">Contact Us</h3>
          <address className="not-italic space-y-3 text-sm">
            <div className="flex items-start">
              <svg className="w-5 h-5 mt-0.5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <div>
                <p className="font-medium text-white">School Office</p>
                <p>+91 12345 67890</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 mt-0.5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <div>
                <p className="font-medium text-white">Email</p>
                <p>info@newlight.edu</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 mt-0.5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-white">Office Hours</p>
                <p>Mon-sat: 8:00 AM - 2:00 PM</p>
              </div>
            </div>
          </address>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold border-b border-purple-500 pb-2 inline-block">Connect With Us</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
              { name: 'Twitter', icon: 'M6 2a4 4 0 100 8 4 4 0 000-8zM4 6a2 2 0 114 0 2 2 0 01-4 0zm16 8a4 4 0 01-2.03.715 5.977 5.977 0 000-11.43A4 4 0 0120 6v12zm-2 0h2a6 6 0 00-6-6v2a4 4 0 014 4z' },
              { name: 'Instagram', icon: 'M8 2a6 6 0 016 6v8a6 6 0 01-6 6H2a6 6 0 01-6-6V8a6 6 0 016-6h6zm0 2H2a4 4 0 00-4 4v8a4 4 0 004 4h6a4 4 0 004-4V8a4 4 0 00-4-4zm6 4a2 2 0 110-4 2 2 0 010 4zm-6 2a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z' },
              { name: 'YouTube', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' }
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="flex items-center space-x-2 text-sm p-2 bg-gray-800 hover:bg-purple-600 rounded transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                </svg>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-12 pt-8 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} New Light Public School. All rights reserved.
          </p>
          <div className="hidden md:block text-gray-600">|</div>
          <div className="flex space-x-4">
            <a href="#" className="text-xs hover:text-purple-400">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-purple-400">Terms of Service</a>
            <a href="#" className="text-xs hover:text-purple-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer