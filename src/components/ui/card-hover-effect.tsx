import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"; // Changed from "motion/react"
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    teachername?: string;
    studentname?:string;
    position?:string;
    post?:string;
    education?: string;
    experience?: string;
    description: string;
    image: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6",// Added gap-4 for spacing
        className
      )}
    >
      {items.map((item, idx) => (
        <div // Changed from <a> to <div> since we're not actually linking
          key={idx} // Changed to use idx as key since item.Image might not be unique
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-84 bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="h-48 w-80 overflow-hidden rounded-t-xl"> {/* Added container for image */}
              <img 
                src={item.image} 
                className="w-full h-full object-cover"
                loading="lazy" // Added lazy loading
              />
            </div>
            <div className="p-4">
              <CardTitle>{item.teachername?
              (
                <>{item.teachername}</>
              )
              
              :
              (
                <>{item.studentname}</>
              )}</CardTitle>
              <div className="text-zinc-300 text-sm mt-2"> {/* Added education and experience */}
              {item.education ? (
                <>
                <p>Education: {item.education}</p>
                <p>Experience: {item.experience}</p></>
              )  
              :(
                 <>
                 {item.post? (
                  <p>Post: {item.post}</p>
                 ):
                 (
                  <p>Position: {item.position}</p>
                 )
                 }
                 </>
              )}
                
              </div>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-80 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 flex flex-col", // Added flex flex-col
        className
      )}
    >
      <div className="relative z-50 flex-1 flex flex-col"> {/* Added flex layout */}
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}> {/* Removed mt-4 */}
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm", // Changed mt-8 to mt-2
        className
      )}
    >
      {children}
    </p>
  );
};