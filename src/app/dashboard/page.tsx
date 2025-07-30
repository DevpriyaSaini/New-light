import { TimelineDemo } from '@/components/dash'
import Footer from '@/components/footer'
import { NavbarDemo } from '@/components/navbar'
import React from 'react'

function Page() {
  return (
    <>
    <div className="fixed  w-full top-0 z-50 dark">
      <NavbarDemo />
      </div>
      <div className=' '>

     <TimelineDemo/>
   </div>
   <Footer/>
    </>
   
   
  )
}

export default Page