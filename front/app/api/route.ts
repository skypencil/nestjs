import { data } from "./data";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    return NextResponse.json(data)
}

export async function POST(request: Request) {
    const toDo = await request.json()
    
    const newTodo = {
        id: data.length + 1,
        todo: toDo.todo,
        author: toDo.author,
        done: false     
    }
    data.push(newTodo)

    return new Response(JSON.stringify(newTodo), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 201
    })
}
