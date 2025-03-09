import { createContext, useEffect, useState } from "react";


const WindowSize = createContext(null);



export default function WindowResize({ children }) {
    const [windowResizeWidth, setWindowResizeWidth] = useState(window.innerWidth);

    useEffect(() => {
                function resize() {
                    setWindowResizeWidth(window.innerWidth);
                }
            window.addEventListener('resize', resize);
            
            return () => {
                window.removeEventListener('resize', resize);
            } 

    }, [])
    return (
    <WindowSize.Provider value={{windowResizeWidth}}>{children}</WindowSize.Provider>
    )
}

export {WindowSize};