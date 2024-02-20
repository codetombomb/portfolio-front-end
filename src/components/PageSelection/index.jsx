import { useRef } from 'react'
import styles from './style.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PageSelection = () => {
    const spanRefs = {
        topRef: useRef(null),
        aboutRef: useRef(null),
        worksRef: useRef(null),
        footerRef: useRef(null),
    }

    useGSAP(() => {
        
    }, {})


    return (
        <div className={styles.pageIndicator}>
            <span id="top-indicator" ref={spanRefs.topRef}></span>
            <span id="about-indicator" ref={spanRefs.aboutRef}></span>
            <span id="works-indicator" ref={spanRefs.worksRef}></span>
            <span id="footer-indicator" ref={spanRefs.footerRef}></span>
        </div>
    )
}

export default PageSelection