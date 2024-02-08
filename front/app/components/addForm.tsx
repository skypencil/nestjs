'use client'

import { useRouter } from "next/navigation"
import { useForm} from "react-hook-form"
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import refreshTokens from "./refreshFunction";



type FormValues = {
    todo: string
}


const AddForm = () => {
    
    const router = useRouter()
    const formHook = useForm<FormValues>()
    const { register, handleSubmit } = formHook;

    let jwtToken = Cookies.get('jwtToken') || ""
    let jwtRToken = Cookies.get('jwtRToken') || ""
    

    const onsubmit = async (data:FormValues) => {

        const createTodoDto = {
            todos: [
                {
                    "text": data.todo
                }
            ],
        }

        if (jwtToken && jwtRToken) {
            const decodeedToken = jwt.decode(jwtToken) as {exp: 0}
            if (decodeedToken.exp < Date.now() / 1000) {
                jwtToken = await refreshTokens(jwtRToken)
            }
        }

        const res = await fetch(`http://localhost:3001/todos/add/`, {
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
        <form onSubmit={handleSubmit(onsubmit)}>
            <input id="todo" {...register("todo")} type="text" placeholder="Todo" className="input input-bordered input-accent w-full max-w-xs my-2" />
            <button className="btn btn-accent my-2">Add Todo</button>
        </form>
    )
}

export default AddForm