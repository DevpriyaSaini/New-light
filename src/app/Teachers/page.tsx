"use client"
import Footer from '@/components/footer'
import { NavbarDemo } from '@/components/navbar'
import Teachercard from '@/components/teacher'
import React from 'react'

function Page() {
  return (
    <>
    <div className="fixed w-full top-0 z-50 dark">
  <NavbarDemo />
</div>
     <div className='mt-5'>
        <Teachercard/>
    </div>
    <Footer/>
    </>
   
  )
}

export default Page