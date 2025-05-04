import { SearchBar } from './SearchBar';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserIcon } from './UserIcon';
import AddToCartPopup from '../../../helpers/AddToCartPopUp';
import Cart from './../Utils/Cart';
import Logo from './../../../Assets/Elegant_Online_Shopping_Logo_Template-removebg-preview.png';
import { useEffect, useState } from 'react';




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
    
        <nav className={`py-2 fixed z-999 px-3 top-0 right-0 w-full bg-white transition-transform duration-300
            ${isVisible ? "translate-y-0" : "translate-y-[-100%] "} `}>

            <Container style={{marginTop: "0px"}}>
            <div className="flex flex-wrap items-center gap-md-0 gap-4 justify-between">
                <Link to="/" className="col-3 hover:!bg-transparent">
                    <img className="w-[200px]" src={Logo} alt="logo" />
                </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 relative">
                <SearchBar  />
            </div>

            <div className="nav-top order-md-3 gap-4 order-1 col-3 flex justify-end items-center">
                <Cart />
                <UserIcon />
            </div>

            </div>

            </Container>
    
        </nav>
        </>
    );
    
}
