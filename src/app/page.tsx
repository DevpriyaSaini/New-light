import Alumnipage from "@/components/alumni";
import DeveloperProfile from "@/components/devloper";
import Footer from "@/components/footer";
import { NavbarDemo } from "@/components/navbar";
import { CarouselDemo } from "@/components/slider";
import Toppercard from "@/components/topper";

export default function Home() {
  return (
   
   <>
    <div className="fixed w-full top-0 z-50 dark">
  <NavbarDemo />
</div>
   < CarouselDemo/>
   
   <Alumnipage/>
   <DeveloperProfile/>
    <Footer/>
   </>
  );
}
