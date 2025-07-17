import { TimelineDemo } from '@/components/dash'
import Footer from '@/components/footer'
import { NavbarDemo } from '@/components/navbar'
import React from 'react'

function page() {
  return (
    <>
    <div className="fixed w-full top-0 z-50 dark">
      <NavbarDemo />
      </div>
      <div className='mt-5 '>

     <TimelineDemo/>
   </div>
   <Footer/>
    </>
   
   
  )
}

export default page