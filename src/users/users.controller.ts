import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';
import { createUserDto } from './dto/createUserDto.dto';
import { UserModel } from './interface/users.interface';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll(): Array<UserModel> {
        return this.userService.findAll();
    }

    @Get(':id')
     findOne(@Param('id') id: string): UserModel {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: createUserDto): UserModel {
        user.user_id = "user_" + uuidv1();
        user.created_at = new Date().toISOString(); 
        return this.userService.create(user);

    }
    /** 
    @Put(':id')
    update(@Body() user: createUserDto, @Param() id: string): UserModel {
        return this.userService.update(user, id)
    }
    */
}

