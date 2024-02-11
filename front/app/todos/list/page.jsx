import Link from "next/link"
import UpdateTodo from "@/app/components/UpdateTodo"
import DeleteTodo from "@/app/components/DeleteTodo"
import CrossMarkSvg from "@/app/components/CrossMarkSvg"
import TickMarkSvg from "@/app/components/TickMarkSvg"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import refreshTokens from "@/app/components/refreshFunction";


const fetchData = async () => {
    const cookieStore = cookies()

    let jwtToken = cookieStore.get('jwtToken')?.value

    let jwtRToken = cookieStore.get('jwtRToken')?.value

    const decodedToken = jwt.decode(jwtToken)

    const userId = decodedToken ? decodedToken.sub : null;
    try {

        if (jwtToken && jwtRToken) {
            const decodeedToken = jwt.decode(jwtToken)
            if (decodeedToken.exp < Date.now() / 1000) {
                jwtToken = await refreshTokens(jwtRToken)
            }
        }

        const res = await fetch(`http://localhost:3001/todos/my-todos`, {
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

const ViewTodo = async () => {

    const data = await fetchData()
    if (data.message) {
        
        return (
            <div>Please Sign In To View Todos</div>
        )
    }
    const todos = data.todos
    return (
        <div>
            {todos.map(item => (
                <div key={todos.indexOf(item)} role="alert" className="alert alert-success my-2">
                    {item.done ?<TickMarkSvg />:<CrossMarkSvg />} 
                    <Link href={`/todos/list/${item.id}`}>{item.text}</Link>
                    <UpdateTodo id={item.id} /> 
                    <DeleteTodo id={item.id} />
                </div>
            ))}
        </div>
    )
}

export default ViewTodo
