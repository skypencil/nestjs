"use client"


import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import jwt from 'jsonwebtoken';
import refreshTokens from "./refreshFunction";

type FormValues = {
    todo: string
}

export default function DeleteTodo({id}: {id: string}) {

    let jwtToken = Cookies.get('jwtToken') || ""
    let jwtRToken = Cookies.get('jwtRToken') || ""
    const router = useRouter()

    const formHook = useForm<FormValues>()
    const { register, handleSubmit } = formHook;

    const deleteTodo = async (data:FormValues) => {

        if (jwtToken && jwtRToken) {
            const decodeedToken = jwt.decode(jwtToken) as {exp: 0}
            if (decodeedToken.exp < Date.now() / 1000) {
                jwtToken = await refreshTokens(jwtRToken)
            }
        }

        const res = await fetch(`http://localhost:3001/todos/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            next: {tags: ['reload']}
        })
        if (res.ok) {
            router.push("/todos/list/")
        } 
    }

    return (
        <form onSubmit={handleSubmit(deleteTodo)}>
            <input type="submit" value="Delete" />
        </form>
    )
}
