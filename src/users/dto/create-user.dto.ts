import { IsString, IsNotEmpty, IsEmail, IsEnum } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Invalid role!'
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';

    // Note: we don't need to redefine the decorators in `update-user` 
    // Inheritence will do that automatically
}