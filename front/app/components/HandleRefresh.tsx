"use client"

import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';


export default function HandleRefresh() {

    const router = useRouter()
    const jwtToken = Cookies.get('jwtRToken')

    const handleClick = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/users/refresh`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            next: {tags: ['reload']}
        })
        if (res.ok) {
            const {access_token, refresh_token} = await res.json();
            Cookies.set('jwtToken', access_token);
            Cookies.set('jwtRToken', refresh_token);
            router.refresh()
            router.push("/todos/list/")
        }
    } 

    return (
        <button onClick={handleClick}>Hi</button>
    )
}
