import { Injectable, NotFoundException } from "@nestjs/common";
import { UserModel } from "./interface/users.interface";
import { v1 as uuidv1 } from "uuid";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDto } from "./dto/createUserDto.dto";

export type User = any;

@Injectable()
export class UsersService {
	private users: Array<UserModel> = [];

	private readonly test = [
		{
			userId: 1,
			username: "john",
			password: "changeme",
		},
		{
			userId: 2,
			username: "maria",
			password: "guess",
		},
	];

	constructor(@InjectModel("Users") private usersModel: Model<UserModel>) {}

	async findUserTest(username: string): Promise<any | User> {
		return this.test.find((user) => user.username === username);
	}

	async findAllUser(): Promise<UserModel[]> {
		const users = await this.usersModel.find().exec();
		if (!users) {
			throw new NotFoundException("Users not found");
		}
		return users;
	}

	async findOneUser(user_id: string): Promise<UserModel> {
		const user: UserModel = await this.usersModel.findOne({ user_id: user_id }).exec();
		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}

	async createUser(user: createUserDto): Promise<UserModel> {
		const newUser = new this.usersModel({
			user_id: "user_" + uuidv1(),
			created_at: new Date().toISOString(),
			...user,
		});
		const result = await newUser.save();

		return result;
	}

	async updateUser(user_id: string, user: createUserDto): Promise<UserModel> {
		const result = await this.usersModel.updateOne({ user_id: user_id }, user).exec();
		if (!result) {
			throw new NotFoundException(`User ${user_id} not found`);
		}
		const userUpdated: UserModel = await this.usersModel.findOne({ user_id: user_id }).exec();
		return userUpdated;
	}

	async deleteUser(user_id: string): Promise<string> {
		const result = await this.usersModel.deleteOne({ user_id: user_id }).exec();
		if (!result) {
			throw new NotFoundException(`User ${user_id} not found`);
		}
		return `User ${user_id} has been deleted`;
	}
}
