"use client"

import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import jwt from 'jsonwebtoken';
import refreshTokens from "./refreshFunction";

type FormValues = {
    todo: string
}

export default function UpdateTodoText({id, done}: {id: string, done:boolean}) {

    const router = useRouter()
    let jwtToken = Cookies.get('jwtToken') || ""
    let jwtRToken = Cookies.get('jwtRToken') || ""

    const formHook = useForm<FormValues>()
    const { register, handleSubmit } = formHook;

    const updateTodo = async (data:FormValues) => {
        const updateDto = {
            text: data.todo,
            done: done
        }

        if (jwtToken && jwtRToken) {
            const decodeedToken = jwt.decode(jwtToken) as {exp: 0}
            if (decodeedToken.exp < Date.now() / 1000) {
                jwtToken = await refreshTokens(jwtRToken)
            }
        }

        const res = await fetch(`http://localhost:3001/todos/update/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(updateDto),
            next: {tags: ['reload']}
        })
        if (res.ok) {
            router.push("/todos/list/")
        }
    } 

    return (
        <form onSubmit={handleSubmit(updateTodo)}>
            <input className="input input-bordered" type="text" id="todo" {...register('todo')}  />
            <input className="btn btn-outline btn-success" type="submit" value="Update" />
        </form>
    )
}
