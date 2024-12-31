import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
    usertype: string;
}
//this is a mockup, and the data should be call from a database but thats not a requirement
const users : User[] = [
    {
        userId: 1,
        username: "emma",
        password: "123456",
        usertype: "admin"
    },
    {
        userId: 2,
        username: "charlse",
        password: "xavier",
        usertype: "base"
    }
];

@Injectable()
export class UsersService {
    async findUserByname(username: string): Promise<User | undefined>{
        return users.find((user) => user.username === username);
    }
}
