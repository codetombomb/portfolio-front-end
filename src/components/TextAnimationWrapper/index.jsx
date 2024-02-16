import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const TextAnimationWrapper = ({children, delay, duration}) => {
    const container = useRef()
    useGSAP(() => {
        gsap.from(container.current, {
            y: "50px",
            opacity: 0,
            duration: duration,
            delay: delay
        })
    }, { scope: container })
    
    return <span className="text-animation" ref={container}>{children}</span>
}

export default TextAnimationWrapper;