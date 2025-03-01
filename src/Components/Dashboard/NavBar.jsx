import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Cookie  from 'cookie-universal';

import axios from "axios";
import { baseUrl, LOGOUT, USER } from "../../Services/Api";
import LoadingSubmit from './../Loading/loading';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../Redux/Slices/MenuSlice";

export default function NavigationBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    // Cookies
    const cookie = Cookie();
    const token = cookie.get("e-commerce")

    // Navigation
    const nav = useNavigate(); 

    // Get User Details
    useEffect(() => {
        axios.get(`${baseUrl}/${USER}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(data => setName(data.data.name))        
        .catch(err => console.log(err))

    }, [])

// Function to handle logout
        async function handleLogOut() {
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/${LOGOUT}`, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            }, [])
            nav("/", {replace : true});
            cookie.remove("e-commerce");
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    if (loading) return <LoadingSubmit />
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
                
                    <div onClick={handleLogOut} className="logout m-2">
                        Logout
                    </div>

                </DropdownButton>
                </div>
                </div>
  )
}

