import { Outlet } from "react-router-dom";
import TopBar from "../../Components/Website/Navigation/topbar";
import NavButton from "../../Components/Website/Navigation/NavButton";


export default function Website() {
    return (
        <div className="h-screen w-full">
            <TopBar />
            <Outlet />
            <NavButton />
        </div>
    );
}
