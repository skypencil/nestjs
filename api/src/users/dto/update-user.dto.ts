import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateTodoDto } from "src/todos/dto/create-todo.dto";

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

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
