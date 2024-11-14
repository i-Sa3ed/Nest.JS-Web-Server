import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

let maxID = 1;

@Injectable()
export class UsersService {
    private users = [
        {
            "id": maxID++,
            "name": "Saeed",
            "email": "saeed@developer.com",
            "role": "ADMIN"
        },
        {
            "id": maxID++,
            "name": "Hossam",
            "email": "hosam@gmail.com",
            "role": "INTERN"
        },
        {
            "id": maxID++,
            "name": "Mohammed",
            "email": "medo@football.com",
            "role": "INTERN"
        },
        {
            "id": maxID++,
            "name": "Habibah",
            "email": "haboob@girl.com",
            "role": "INTERN"
        },
        {
            "id": maxID++,
            "name": "Zeyad",
            "email": "zezo@developer.dev",
            "role": "ENGINEER"
        }
    ]

    // Let's implement the functions used by the controller (the router)

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const validUsers = this.users.filter(user => user.role === role);
            if (validUsers.length === 0)
                throw new NotFoundException('Invalid role entered!');
            return validUsers;
        }
            
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user)
            throw new NotFoundException(`No user with this id ${id}`);
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: maxID, 
            ...createUserDto
        }; 
        ++maxID; 

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id)
                return { ...user, ...updateUserDto}; // this will override `user`!!
            
            return user;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const toRemove = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id); // the core
        return toRemove;
    }
}
