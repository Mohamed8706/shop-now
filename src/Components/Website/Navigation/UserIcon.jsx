import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from './../../../hooks/useAuth';
import { useQueryClient } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";


export function UserIcon() {
    const {logout, isLoggingOut} = useAuth();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);
    console.log(user)
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
            {user ? (
                <>
                    <NavLink to="/" className={"d-flex align-items-center gap-2 m-2"}>
                        Home
                    </NavLink>
                    {["1999", "1995", "1996"].includes(user.role) && (
                        <NavLink
                            to="/dashboard"
                            className={"d-flex align-items-center gap-2 m-2"}
                        >
                            Dashboard
                        </NavLink>
                    )}
                    <div onClick={() => logout()} className="logout m-2">
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
