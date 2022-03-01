import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { createUserDto } from "./dto/createUserDto.dto";
import { UserModel } from "./interface/users.interface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private userService: UsersService) {}

	@Get()
	findAll(): Promise<UserModel[]> {
		return this.userService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string): Promise<UserModel> {
		return this.userService.findOne(id);
	}

	@Post()
	create(@Body() user: createUserDto): Promise<UserModel> {
		return this.userService.create(user);
	}
	/** 
    @Put(':id')
    update(@Body() user: createUserDto, @Param() id: string): UserModel {
        return this.userService.update(user, id)
    }
    */
}
