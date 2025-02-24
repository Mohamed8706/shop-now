import React, { useCallback, useEffect, useMemo, useState } from "react";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { DropdownButton } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, LOGOUT, USER } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "cookie-universal";

export function UserIcon() {
    // States
    const [role, setRole] = useState("");

    const nav = useNavigate();
    // Cookies and token
    const cookie = Cookie();
    const token = cookie.get("e-commerce");


    const fetchUser = useCallback(async () => {
        if (!token) return;

        try {
            const { data } = await axios.get(`${baseUrl}/${USER}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setRole(data.role);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    async function handleLogOut() {
        try {
            const res = await axios.get(
                `${baseUrl}/${LOGOUT}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
                []
            );
            nav("/", { replace: true });
            cookie.remove("e-commerce");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={
                <FontAwesomeIcon
                    className="bg-primary p-2  rounded-full"
                    icon={faUserCircle}
                    color="white"
                    fontSize={27}
                />
            }
        >
            {token ? (
                <>
                    <NavLink to="/" className={"d-flex align-items-center gap-2 m-2"}>
                        Home
                    </NavLink>
                    {["1999", "1995", "1996"].includes(role) && (
                        <NavLink
                            to="/dashboard"
                            className={"d-flex align-items-center gap-2 m-2"}
                        >
                            Dashboard
                        </NavLink>
                    )}
                    <div onClick={handleLogOut} className="logout m-2">
                        Logout
                    </div>
                </>
            ) : (
                <>
                    <NavLink
                        to="/login"
                        className={"d-flex align-items-center gap-2 m-2"}
                    >
                        Log in
                    </NavLink>
                    <NavLink
                        to="/register"
                        className={"d-flex align-items-center gap-2 m-2 "}
                    >
                        Get Started
                    </NavLink>
                </>
            )}
        </DropdownButton>
    );
}
