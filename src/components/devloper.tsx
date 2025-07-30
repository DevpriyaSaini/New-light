import React from 'react'

function DeveloperProfile() {
  return (
    <div 
  id="developer"
  className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300"
>
  <div className="max-w-6xl w-full mx-auto">
    <div className="text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-400 dark:to-cyan-500 mb-4">
        Meet Our Developer
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Passionate coder with a strong academic background and problem-solving skills
      </p>
    </div>
    
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-10 shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700/50 transition-colors duration-300">
      <div className="w-full lg:w-1/3 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-2 object-cover  rounded-full  "></div>
          <img 
            src="/Devpic.jpg" 
            alt="Developer Illustration" 
            className="relative w-full h-80 sm:w-72 sm:h-72 object-contain rounded-full border-4 border-teal-500 dark:border-teal-400 shadow-xl z-10 transition duration-300 "
          />
        </div>
      </div>
      
      <div className="w-full lg:w-2/3 space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-700 dark:from-teal-300 dark:to-cyan-400 mb-2">
            Hey, I'm Devpriya Saini
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-400 dark:to-cyan-500 rounded-full mb-4"></div>
        </div>
        
        <div className="space-y-5 text-gray-700 dark:text-gray-300">
          <p className="text-lg sm:text-xl leading-relaxed">
            <span className="text-teal-600 dark:text-teal-400 font-semibold">Proud alumnus of New Light Public School</span> who cracked JEE Advanced to secure a seat at IIT Jammu, demonstrating exceptional academic prowess and dedication.
          </p>
          
          <p className="text-lg sm:text-xl leading-relaxed">
            Currently leveraging my problem-solving skills as a <span className="text-cyan-700 dark:text-cyan-400 font-semibold">Full Stack Developer</span>, building robust web applications with modern technologies like React, Node.js, and MongoDB.
          </p>
          
          <p className="text-lg sm:text-xl leading-relaxed">
            My journey from solving physics numericals to debugging complex systems reflects the strong foundation laid by my school. Passionate about creating <span className="text-teal-600 dark:text-teal-400">tech solutions</span> that make a real impact.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="inline-flex items-center bg-gray-200/80 hover:bg-gray-300/80 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 rounded-full px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300 transition duration-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
              #IITian
            </span>
            <span className="inline-flex items-center bg-gray-200/80 hover:bg-gray-300/80 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 rounded-full px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300 transition duration-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              #FullStackDev
            </span>
            <span className="inline-flex items-center bg-gray-200/80 hover:bg-gray-300/80 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 rounded-full px-4 py-2 text-sm font-semibold text-teal-700 dark:text-teal-300 transition duration-300">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              #ProblemSolver
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-16 text-center">
      <button className="relative px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-700 dark:from-teal-500 dark:to-cyan-600 hover:from-teal-700 hover:to-cyan-800 dark:hover:from-teal-600 dark:hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/20 dark:hover:shadow-teal-400/20 group">
        <span className="relative z-10">Connect with Me</span>
        <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-teal-400 dark:to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 -z-0"></span>
        <span className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-500 dark:from-teal-300 dark:to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-500 -z-10"></span>
      </button>
    </div>
  </div>
</div>
  )
}

export default DeveloperProfile