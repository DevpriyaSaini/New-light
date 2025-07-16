import Alumnipage from "@/components/alumni";
import Alumnircard from "@/components/alumni";
import DeveloperProfile from "@/components/devloper";
import Footer from "@/components/footer";
import { NavbarDemo } from "@/components/navbar";
import { CarouselDemo } from "@/components/slider";
import Teachercard from "@/components/teacher";
import Toppercard from "@/components/topper";
import Image from "next/image";

export default function Home() {
  return (
   
   <>
    <div className="fixed w-full top-0 z-50 dark">
  <NavbarDemo />
</div>
   < CarouselDemo/>
   <Toppercard/>
   <Alumnipage/>
   <DeveloperProfile/>
    <Footer/>
   </>
  );
}
