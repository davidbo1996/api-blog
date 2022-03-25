import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { createUserDto } from "./dto/createUserDto.dto";
import { UserModel } from "./interface/users.interface";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private userService: UsersService) {}

	@Get()
	findAll(): Promise<UserModel[]> {
		return this.userService.findAllUser();
	}

	@Get(":user_id")
	findOne(@Param("user_id") id: string): Promise<UserModel> {
		return this.userService.findOneUser(id);
	}

	@Post()
	create(@Body() user: createUserDto): Promise<UserModel> {
		return this.userService.createUser(user);
	}

	@Put(":user_id")
	update(@Body() user: createUserDto, @Param("user_id") user_id: string): Promise<UserModel> {
		return this.userService.updateUser(user_id, user);
	}

	@Delete(":user_id")
	delete(@Param("user_id") user_id: string): Promise<string> {
		return this.userService.deleteUser(user_id);
	}
}
