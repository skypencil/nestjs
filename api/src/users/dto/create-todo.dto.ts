import { IsNotEmpty, IsString } from "class-validator";

class TodoDto {
    @IsString()
    @IsNotEmpty()
    text: string;
}

export class CreateTodoDto {
    @IsNotEmpty()
    todos: TodoDto[];
}
