import {  Outlet } from "react-router-dom";
import { SideBar } from "../../Components/Dashboard/sidebar";
import { useContext } from "react";
import { WindowSize } from "../../context/windowresize";
import NavigationBar from "../../Components/Dashboard/NavBar";
import { useSelector } from "react-redux";
import MobileSideBar from "../../Components/Dashboard/MobileSideBar";



export default function Dashboard() {
    const resizeWidth = useContext(WindowSize);
    const isOpen = useSelector((state) => state.menu.isOpen);
    return (
        <>
            <SideBar />
            {resizeWidth.windowResizeWidth < 768 && isOpen && <MobileSideBar />}
            <div className="content-container dashboard flex overflow-auto bg-gray-100 h-screen" >
                <div className="p-3 w-full relative overflow-auto">
                    <NavigationBar />
                    <Outlet /> 
                </div>
            </div>

        </>
    );
}
