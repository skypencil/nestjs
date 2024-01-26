import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateTodoDto } from "./create-todo.dto";

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;
}
