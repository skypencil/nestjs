"use client"


import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';

export default function DeleteTodo({id}: {id: string}) {

    const jwtToken = Cookies.get('jwtToken')
    const router = useRouter()
    

    const handleClick = async (e:any) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:3000/users/todo/delete/${id}`, {
            method: "DELETE",
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
        <a href="#" onClick={handleClick}>Delete</a>
    )
}
