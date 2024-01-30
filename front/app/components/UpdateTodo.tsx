"use client"

import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';

export default function UpdateTodo({id}: {id: string}) {

    const router = useRouter()
    const jwtToken = Cookies.get('jwtToken')

    const handleClick = async (e:React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/users/todo/update/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            next: {tags: ['reload']}
        })
        router.refresh()
        router.push("/todos/list/")
    } 

    return (
        <a href="#" onClick={handleClick}>Done</a>
    )
}
