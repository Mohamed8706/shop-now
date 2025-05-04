import {  ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            }
            else {
                setIsVisible(false);
            }
        }
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [])

    const scrolToTop = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }

return (
    <> 
    {isVisible &&
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-3 right-4 z-999 bg-[#f5f5f5] p-2 rounded-full cursor-pointer shadow"
        aria-label="Scroll to top">
        <ChevronUpIcon  color="#36ce70" size={30} onClick={scrolToTop}/>
    </motion.div>}    
    </>
)
}