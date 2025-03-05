import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LoadingSubmit from './../Loading/loading';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../Redux/Slices/MenuSlice";
import { useAuth } from "../../hooks/useAuth";

export default function NavigationBar() {
    const dispatch = useDispatch();
    const {logout, isLoggingOut} = useAuth();
    const {user} = useAuth()
    const name = user.name;
    
    if (isLoggingOut) return <LoadingSubmit />
  return (
  <div className="flex justify-center w-full">
    <div className="flex p-2 px-3 mb-4 shadow rounded align-center justify-between gap-5 w-[100%] bg-white"> 
        <FontAwesomeIcon onClick={() => dispatch(toggleMenu())} icon={faBars} style={{
        transform: "translateY(-20%)",
        fontSize: "1.1rem",
        cursor: "pointer",
        color: 'black',
        alignSelf: 'center'
      }} />

            <DropdownButton id="dropdown-basic-button" title={name}>   
                    
                        <Link to="/" key={1} className={"d-flex align-items-center gap-2 m-2"}>
                                Home
                        </Link>
                    
                    
                        <Link to="/dashboard" key={2} className={"d-flex align-items-center gap-2 m-2"}>
                                    Dashboard  
                        </Link>
                
                    <div onClick={() => logout()} className="logout m-2">
                        Logout
                    </div>

                </DropdownButton>
                </div>
                </div>
  )
}

