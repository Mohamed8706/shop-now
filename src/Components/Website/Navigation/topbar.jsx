import { SearchBar } from './SearchBar';
import { Link } from "react-router-dom";
import { UserIcon } from './UserIcon';
import AddToCartPopup from '../../../helpers/AddToCartPopUp';
import Cart from './../Utils/Cart';
import Logo from './../../../Assets/Elegant_Online_Shopping_Logo_Template-removebg-preview.png';
import { useEffect, useState } from 'react';
import SearchIcon from './SearchIcon';




export default function TopBar() {
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollPos > currentScrollPos || currentScrollPos < 10){
                setIsVisible(true);
            }
            else {
                setIsVisible(false);
            }
            setPrevScrollPos(currentScrollPos);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);    
    }, [prevScrollPos])

    return (
        <>
        <AddToCartPopup />
        <nav className={`py-1 relative md:fixed z-999 px-3 border-b border-[#f7f7f7] top-0 right-0 w-full bg-white transition-transform duration-300
            ${!isVisible ? "translate-y-[-100%]" : "translate-y-0"} `}>

        
            <div className="flex flex-col md:flex-row flex-wrap items-center gap-3 justify-between">
                <Link to="/" className="w-3/7 md:w-1/8 hover:!bg-transparent">
                    <img className="w-full h-full" src={Logo} alt="logo"/>
                </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 relative d-none d-md-block flex justify-center">
                <SearchBar  />
            </div>

            <div className="nav-top  order-md-3 gap-4 order-1 w-full md:w-1/6 flex justify-center items-center">
                <Cart />
                <SearchIcon />
                <UserIcon />
            
            </div>

            </div>

       
    
        </nav>
        </>
    );
    
}
