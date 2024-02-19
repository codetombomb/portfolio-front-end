import style from './styles.module.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const ContactMenu = () => {
    const navRef = useRef(null)
    const linkOneRef = useRef(null)
    const linkTwoRef = useRef(null)
    const linkThreeRef = useRef(null)

    useGSAP(() => {
        gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: .1 })
        gsap.fromTo(linkOneRef.current, { opacity: 0, y: 10 }, { opacity: 1, delay: .3, y: 0 })
        gsap.fromTo(linkTwoRef.current, { opacity: 0, y: 10 }, { opacity: 1, delay: .2, y: 0 })
        gsap.fromTo(linkThreeRef.current, { opacity: 0, y: 10 }, { opacity: 1, delay: .1, y: 0 })
    }, { scope: navRef })

    return (
        <>
            <nav className={style.contactMenu} ref={navRef}>
                <h1>Let's Connect!</h1>
                <a href='https://github.com/codetombomb' ref={linkOneRef}>GitHub</a>
                <a href='https://www.linkedin.com/in/tomtobar' ref={linkTwoRef}>Linkedin</a>
                <a href='mailto:codetombomb@gmail.com' ref={linkThreeRef}>codetombomb@gmail.com</a>
            </nav>
        </>
    )
}


export default ContactMenu