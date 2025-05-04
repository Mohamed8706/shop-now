import { Outlet } from "react-router-dom";
import TopBar from "../../Components/Website/Navigation/topbar";
import NavButton from "../../Components/Website/Navigation/NavButton";
import ScrollToTop from "../../Components/Website/Utils/ScrollToTop";


export default function Website() {
    return (
        <div className="h-screen w-full">
            <TopBar />
            <Outlet />
            <ScrollToTop />
            {/* <NavButton /> */}
        </div>
    );
}
