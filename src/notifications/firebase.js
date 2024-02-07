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
            vapidKey: "BIwW1HuZaMhDjlsSgi_1qVGIJT3zAlbeZogmOmjhLi4z5_N45BOam8GHJ174aNOpjkixNwqxoIAAaBHNT-sJWEI"
        })
        return await fetch(`${import.meta.env.VITE_API_URL}/device_tokens/${token}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json().then(data => data.id)
                } else {
                    const config = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            token,
                            admin_id
                        })
                    }
                    return fetch(`${import.meta.env.VITE_API_URL}/device_tokens`, config)
                        .then(resp => resp.json())
                        .then(data => data)
                        .catch(err => console.log(err))


                }
            })

    }
}

