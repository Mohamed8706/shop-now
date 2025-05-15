import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../Redux/Slices/MenuSlice";
import { UserIcon } from "../Website/Navigation/UserIcon";

export default function NavigationBar() {
    const dispatch = useDispatch();
  return (
  <div className="flex sticky top-0 justify-center w-full z-999">
    <div className="flex p-2 px-3 mb-4 shadow rounded-2xl items-center justify-between gap-5 w-[100%] bg-white"> 
        <FontAwesomeIcon onClick={() => dispatch(toggleMenu())} icon={faBars} fontSize={17} 
        className="cursor-pointer block md:!hidden"/>
        <FontAwesomeIcon icon={faBell} fontSize={20} className="!hidden md:!block cursor-pointer" color="#06c44fcc" />
        <UserIcon />
    </div>
  </div>
  )
}

