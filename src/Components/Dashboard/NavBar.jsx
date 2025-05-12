import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../Redux/Slices/MenuSlice";
import { UserIcon } from "../Website/Navigation/UserIcon";

export default function NavigationBar() {
    const dispatch = useDispatch();
  return (
  <div className="flex justify-center w-full">
    <div className="flex p-2 px-3 mb-4 shadow rounded-2xl items-center justify-between gap-5 w-[100%] bg-white"> 
        <FontAwesomeIcon onClick={() => dispatch(toggleMenu())} icon={faBars} fontSize={17} 
        className="cursor-pointer"/>
        <UserIcon />
    </div>
  </div>
  )
}

