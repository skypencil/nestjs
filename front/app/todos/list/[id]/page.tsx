import UpdateTodo from "@/app/components/UpdateTodo"
import DeleteTodo from "@/app/components/DeleteTodo" 
import { Params } from "@/app/components/Params"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
 

const fetchData = async (id: number) => {
    const cookieStore = cookies()

    const jwtToken = cookieStore.get('jwtToken')?.value

    try {
        const res = await fetch(`http://localhost:3000/users/todo/one/${id}`, {
            next: {tags: ['reload']},
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            }
        })

        const data = await res.json()
        return data
    } catch (err) {
        return err
    }
}
 
const ViewOneTodo = async ({params}:{params: Params}) => {

    const data = await fetchData(+params.id)
    const machted_todo = data.todo

    return (
        <div>
            {
                <div role="alert" className="alert alert-success my-2">
                    {machted_todo.done ? <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>:<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    <span>{machted_todo.text}</span>
                    <UpdateTodo id={machted_todo.id} />
                    <DeleteTodo id={machted_todo.id} />
                </div>
            }
        </div>
    )
}

 
export default ViewOneTodo
 
