import { footerLinks } from "../Utils/links";
import Logo from "../../../Assets/Elegant_Online_Shopping_Logo_Template-removebg-preview.png";
import { Link } from "react-router-dom";

export default function Footer() {
    const showLinks = footerLinks.map((link, sectionIndex) => {
        const links = link.slice(1).map((tag, tagIndex) => (
        <Link
            key={`${sectionIndex}-${tagIndex}`} 
            to={tag.path}
            className="text-lg !text-gray-600 font-light p-2 rounded-xl"
        >
            {tag.name}
        </Link>
        ));

        return (
        <div
            key={`section-${sectionIndex}`}
            className="flex flex-col items-start lg:items-center w-full md:w-1/2 lg:w-1/6 gap-2"
        >
            <h2 className="my-3 text-xl font-semibold text-gray-800">{link[0]}</h2>
            {links}
        </div>
        );
    });

    return (
        <footer className="bg-white w-full my-8 border-t-2 border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between gap-8 
        text-gray-600">
            {/* Logo and Description */}
            <div className="flex flex-col w-full md:w-1/2 lg:w-1/6 items-start">
            <img
                src={Logo}
                alt="logo"
                className="w-64 md:w-72 lg:w-80 aspect-[3/1] mb-6"
            />
            <p className="text-left text-lg font-medium text-gray-400 lg:max-w-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis
                sed ptibus liberolectus nonet psryroin. Amet sed lorem posuere sit
                iaculis amet.
            </p>
            </div>

            
            {showLinks}
        </div>
        </footer>
    );
}