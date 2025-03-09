import { footerLinks } from "../Utils/links"
import Logo from "../../../Assets/elegant_online_shopping_logo_template-removebg-preview.png"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
export default function Footer() {
    const showLinks = footerLinks.map((link) => {
        const links = link.map((tag) => {
            return(
                <Link key={tag.name} to={tag.path} className="text-xl cursor-pointer
                p-2 rounded-2xl !text-gray-600 font-light">{tag.name}</Link>
            )
        })
        
        return(
            <div className="flex flex-col items-start lg:items-center w-full md:w-1/2 lg:w-1/6 gap-3">
            <h2 className="my-4">{link[0]}</h2>
            {links}
            </div>
        )
    })

    return(
        <footer className="bg-white my-10  w-full 
            h-2/3 border-t-2 border-gray-200">
            <Container className="flex justify-between flex-wrap text-center 
            text-sm font-semibold text-gray-600 p-7 f-cairo">
            <div className="flex flex-col w-full md:w-1/2 lg:w-1/6 items-start ">
            <img src={Logo} alt="logo" className="w-[300px] aspect-3/1"/>
            <p className="w-2/3 md:w-1/2 lg:w-3/4 text-left font-semibold text-xl text-gray-400 !my-12 lg:my-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sagittis sed ptibus liberolectus nonet psryroin. 
                    Amet sed lorem posuere sit iaculis amet
            </p>
            </div>
            {showLinks}
            </Container>
            </footer>
    )
}