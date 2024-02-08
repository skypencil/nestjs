import UpdateTodo from "@/app/components/UpdateTodo"
import DeleteTodo from "@/app/components/DeleteTodo" 
import { Params } from "@/app/components/Params"
import { cookies } from 'next/headers'
import TickMarkSvg from "@/app/components/TickMarkSvg";
import CrossMarkSvg from "@/app/components/CrossMarkSvg";
import UpdateTodoText from "@/app/components/UpdateTodoText";
import jwt from 'jsonwebtoken';
import refreshTokens from "@/app/components/refreshFunction";


const fetchData = async (id: number) => {
    const cookieStore = cookies()

    let jwtToken = cookieStore.get('jwtToken')?.value

    let jwtRToken = cookieStore.get('jwtRToken')?.value

    try {

        if (jwtToken && jwtRToken) {
            const decodeedToken = jwt.decode(jwtToken) as {exp: 0}
            if (decodeedToken.exp < Date.now() / 1000) {
                jwtToken = await refreshTokens(jwtRToken)
            }
        }

        const res = await fetch(`http://localhost:3001/todos/one/${id}`, {
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
                    {machted_todo.done ? <TickMarkSvg/>:<CrossMarkSvg/>}
                    <span>{machted_todo.text}</span>
                    <UpdateTodo id={machted_todo.id} />
                    <DeleteTodo id={machted_todo.id} />
                </div>
            }
            <UpdateTodoText id={machted_todo.id} done={machted_todo.done} />
        </div>
    )
}

 
export default ViewOneTodo
 
