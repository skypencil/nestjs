import { Params } from "@/app/components/Params"
import { data } from "../data"

export async function GET(request:Request, {params}:{params: Params}) {
    const todo = data.filter(item => item.author === params.author)

    return Response.json(todo)
}
