import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { links } from "../Website/Utils/links";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toggleMenu } from "../../Redux/Slices/MenuSlice";

export default function MobileSideBar() {
    const isOpen = useSelector((state) => state.menu.isOpen);
    const {user} = useAuth();
    const dispatch = useDispatch();
    console.log(isOpen)
    return (
        <>
        <Offcanvas show={isOpen} onHide={() => dispatch(toggleMenu())}  placement="start" className="items-center !w-2/3 f-cairo">
            <Offcanvas.Header  className="text-2xl p-4">
                <Offcanvas.Title>
                <h5 className="text-[#333333] font-bold">Spike Admin</h5>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="w-full">
                <div className="overflow-y-auto w-full links-container" style={{maxHeight: "calc(100% - 60px)"}}>
                            {links.map((link, key) => {
                            return link.role.includes(user.role) && 
                            <NavLink key={key} to={link.path} 
                            className={"flex rounded-e-full items-center mb-1 gap-2 f-jakarta !text-md !font-[500] w-full"}>
                            <FontAwesomeIcon icon={link.icon} />
                            <p >
                                {link.name}
                            </p>
                            </NavLink>
                            })}
                </div>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}