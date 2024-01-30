'use client'

import { revalidatePath } from "next/cache"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';



const AddForm = () => {
    
    const router = useRouter()
    const jwtToken = Cookies.get('jwtToken')
    let decodedToken
    if (jwtToken !== undefined) {
        decodedToken = jwt.decode(jwtToken)
    } else {decodedToken = ""}
    

    const userId = decodedToken ? decodedToken.sub : null;


    const [todo, setTodo] = useState("")
    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const createTodoDto = {
            todos: [
                {
                    "text": todo
                }
            ],
        }
        const res = await fetch(`http://localhost:3000/users/todo/add/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(createTodoDto)
        })

        if (res.ok) {
            router.push("/todos/list/")
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={e=>setTodo(e.target.value)} type="text" placeholder="Todo" className="input input-bordered input-accent w-full max-w-xs my-2" />
            <button className="btn btn-accent my-2">Add Todo</button>
        </form>
    )
}

export default AddForm