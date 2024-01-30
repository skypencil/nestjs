import { data } from "@/app/api/data";
import { Params } from "@/app/components/Params";

export async function PATCH(request:Request, {params}:{params:Params}) {

    let matched_todo = data.find(item => item.author === params.author && item.id === parseInt(params.id))
    
    if (matched_todo !== undefined)
        matched_todo.done = true

    return Response.json(data)
}