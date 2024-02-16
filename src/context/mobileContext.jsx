import { createContext, useState, useEffect } from "react";


export const MobileContext = createContext()

const MobileProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(null)

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
    }, []);

    const resize = () => {
        if (window.innerWidth < 576) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    return <MobileContext.Provider value={{
        isMobile,
        setIsMobile
    }}>{children}</MobileContext.Provider>
}

export default MobileProvider