    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { memo, useContext } from "react";
    import { NavLink } from "react-router-dom";
    import { WindowSize } from "../../context/windowresize";
    import Cookie from "cookie-universal";
    import { useEffect, useState } from "react";
    import { baseUrl, USER } from "./../../Api/Api";
    import axios from "axios";
    import { links } from "./links";
import { useSelector } from "react-redux";

    export const SideBar = memo(function SideBar() {
    const isOpen = useSelector((state) => state.menu.isOpen);
    const resizeWidth = useContext(WindowSize);
    const [user, setUser] = useState("");

    const cookie = Cookie();
    const token = cookie.get("e-commerce");

    useEffect(() => {
        axios
        .get(`${baseUrl}/${USER}`, {
            headers: {
            Authorization: "Bearer " + token,
            },
        })
        .then((data) => setUser(data.data))
        .catch((err) => console.log(err));
    }, []);

    return (
        <div
        className="side-bar bg-white py-3 text-center"
        style={{
            width: isOpen
            ? resizeWidth.windowResizeWidth < "768"
                ? "fit-content"
                : "190px"
            : "fit-content",
            display: !isOpen && resizeWidth.windowResizeWidth < "768" && "none"
        }}
        >
            {isOpen && resizeWidth.windowResizeWidth > "768" && <h5 className="font-bold">Dashboard</h5>}
        
        {links.map((link, key) => {
            return link.role.includes(user.role) && <NavLink
            key={key}
            to={link.path}
            className={"d-flex align-items-center gap-2"}
            style={{ padding: isOpen ? "10px 8px 10px 15px" : "10px 10px" }}
            >
            <FontAwesomeIcon icon={link.icon} />
            <p
                style={{
                display: isOpen
                    ? resizeWidth.windowResizeWidth < "768"
                    ? "none"
                    : "block"
                    : "none",
                }}
            >
                {link.name}
            </p>
            </NavLink>;
        })}
        </div>
    );
    });
