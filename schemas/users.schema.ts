import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UsersDocument = Users & Document;

@Schema()
export class Users {
	@Prop({ required: true, unique: true })
	user_id: string;

	@Prop({ required: true })
	email: string;

	@Prop()
	created_at: string;

	@Prop()
	update_at: string;

	@Prop()
	first_name: string;

	@Prop()
	last_name: string;

	@Prop({ required: true })
	password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
