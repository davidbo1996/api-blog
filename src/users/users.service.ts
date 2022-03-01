import { Injectable, NotFoundException } from "@nestjs/common";
import { UserModel } from "./interface/users.interface";
import { v1 as uuidv1 } from "uuid";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
	private users: Array<UserModel> = [];

	constructor(@InjectModel("Users") private readonly usersModel: Model<UserModel>) {}

	async findAll(): Promise<UserModel[]> {
		return await this.usersModel.find().exec();
	}

	async findOne(id: string): Promise<UserModel> {
		const user: UserModel = await this.usersModel.findById(id).exec();

		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}

	async create(user): Promise<UserModel> {
		const newUser = new this.usersModel({
			user_id: "user_" + uuidv1(),
			created_at: new Date().toISOString(),
			...user,
		});
		const result = await newUser.save();
		console.log(result);
		return result;
	}
}
