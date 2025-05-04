import { CheckCircle, XCircle } from "lucide-react";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handlePopUp } from "../Redux/Slices/CartSlice";


export default function AddToCartPopup() {
    const dispatch = useDispatch();
    const added = useSelector((state) => state.cart.added);
    const removed = useSelector((state) => state.cart.removed);
    useEffect(() => {
        if (added || removed) { 
            const timer = setTimeout(() => dispatch(handlePopUp("reset")), 1000); // Hide after 1 sec
            return () => clearTimeout(timer);
        }
    }, [added, removed]);

    if (added || removed) return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-5 right-5 bg-white shadow-lg p-4 z-[2000]
            rounded-2xl flex items-center gap-3 border border-gray-200">
            {added && <><CheckCircle className="text-green-500" size={24} />
            <p className="text-sm font-medium">Added to Cart</p></> }
            {removed && <><XCircle className="text-red-500" size={24} />
            <p className="text-sm font-medium">Removed from Cart</p></>}
        </motion.div>
    );
}
