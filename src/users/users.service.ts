import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './interface/users.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    private users: Array<UserModel> = []; 

    public findAll(): Array<UserModel> {
        return this.users; 
    }

    public findOne(id: string): UserModel {
        const user: UserModel = this.users.find( user => user.user_id === id);

        if (!user){
            throw new NotFoundException("User not found");
        }

        return user;
    }

    public create(user: UserModel): UserModel {
        this.users.push(user);
        return user;
    }


}
