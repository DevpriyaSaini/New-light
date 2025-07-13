import Alumnircard from "@/components/alumni";
import { NavbarDemo } from "@/components/navbar";
import { CarouselDemo } from "@/components/slider";
import Teachercard from "@/components/teacher";
import { InfiniteMovingCardsDemo } from "@/components/thoughts";
import Toppercard from "@/components/topper";
import Image from "next/image";

export default function Home() {
  return (
   
   <>
   < CarouselDemo/>
   <InfiniteMovingCardsDemo/>
   <Toppercard/>
   <Alumnircard/>
   </>
  );
}
