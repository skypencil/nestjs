"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from 'js-cookie';

export default function SignInForm() {

    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userDto = {
            email: email,
            password: password
        }

            const res = await fetch("http://localhost:3000/users/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDto)
            })

            if (res.ok) {
                const {access_token} = await res.json();
                Cookies.set('jwtToken', access_token);
                router.push("/todos/list/")
            }

            else {
                const err = await res.json()
                alert(err.message)
            }
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="input input-bordered input-accent w-full max-w-xs my-2" />
            <input onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered input-accent w-full max-w-xs my-2" />
            <button className="btn btn-accent my-2">Sign Up</button>
        </form>
    )
}