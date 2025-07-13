"use client"
import React from 'react'
import { HoverEffect } from "./ui/card-hover-effect";
import Link from 'next/link';


export const projects = [
{
    studentname: "Lalit Dhiman",
    post:"IIT Jammu",
    description:
      "The world's premier performing arts conservatory, offering dance, drama, and music education at the highest level.",
    image: "https://imgs.search.brave.com/mXaRWwcZTbY97tNxudXMSXKZ8DnlsmXvQJzSY7lc2zs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vNGVhOWVj/M2EtNWUyMi00OGVj/LWIwZWUtYTBlMzc4/NTI3ZjA3L2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM4MTc2NjMw/NzcxNjAwMDAw",
  },

  
];

function Alumnircard() {
  return (
     <div className="Alumni">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Our Alumni Network</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Stay Connected. Stay Inspired.!</p>
        </div>

        <div className="mt-10">
            <HoverEffect items={projects} />
        </div>

        
      </div>
    </div>

  )
}

export default Alumnircard