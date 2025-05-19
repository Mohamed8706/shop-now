import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useContext } from "react";
import { NavLink } from "react-router-dom";
import { WindowSize } from "../../context/windowresize";
import { links } from "../Website/Utils/links";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { Rocket, RocketIcon } from "lucide-react";
import { faRocket } from "@fortawesome/free-solid-svg-icons";


export const SideBar = memo(function SideBar() {
    const isOpen = useSelector((state) => state.menu.isOpen);
    const resizeWidth = useContext(WindowSize);

    const {user} = useAuth();


    return (
        <div className="side-bar bg-white  text-center h-full">
            <div className="w-full flex gap-2 px-3 py-6 items-center h-[86px]">
            <FontAwesomeIcon icon={faRocket} color="#06c44fcc" size="2xl"/>
            <h5 className="text-[#333333] font-bold">Spike Admin</h5>
            </div>
            <div className="overflow-y-auto w-full links-container" style={{maxHeight: "calc(100% - 60px)"}}>
            {links.map((link, key) => {
            return link.role.includes(user.role) && 
            <NavLink key={key} to={link.path} 
            className={"flex rounded-e-full items-center p-2.5 mb-1 gap-2 f-jakarta !text-md !font-[500] w-full"}>

            <FontAwesomeIcon icon={link.icon} />
            <p >
                {link.name}
            </p>
            </NavLink>
            })}
            </div>
        </div>
    );
    });
