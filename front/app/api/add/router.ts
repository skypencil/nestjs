import { Params } from "@/app/components/Params"
import { data } from "../data"

async function POST(request:Request, {params}:{params: Params}) {

    const body = await request.json()

    const new_todo = {
        id: data.length + 1,
        todo: body.todo,
        author: body.author,
        done: false
    }

    const res = await fetch("http://localhost:3000/api/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(new_todo)
    })

    return Response.json(data)
}