import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyDbpEMidLyoKRtxjFVtWu7_d32eH6fDS3o",
    authDomain: "tom-tobar-dev-portfolio-chat.firebaseapp.com",
    projectId: "tom-tobar-dev-portfolio-chat",
    storageBucket: "tom-tobar-dev-portfolio-chat.appspot.com",
    messagingSenderId: "261103496619",
    appId: "1:261103496619:web:778b234c59ec3d63dfb6ee",
    measurementId: "G-559XLB4R1W"
};


const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

export const generateToken = async (admin_id) => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BKa2bzSq8NKk-bmL0GlWQF34GXBXYYqeNzAtbkpKSeMb59zSvpWdIL8fq8FdRJMB3twyJa9ZDVpxIc5BFrao9iA"
        })
        return await fetch(`${import.meta.env.VITE_API_URL}/device_tokens/${token}`)
            .then(async resp => {
                if (resp.ok) {
                    const data = await resp.json();
                    return data.id;
                } else {
                    const config = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            token,
                            admin_id
                        })
                    }
                    try {
                        const resp_1 = await fetch(`${import.meta.env.VITE_API_URL}/device_tokens`, config);
                        const data_1 = await resp_1.json();
                        return data_1;
                    } catch (err) {
                        console.log(err);
                    }


                }
            })

    }
}

