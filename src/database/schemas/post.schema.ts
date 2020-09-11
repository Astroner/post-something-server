import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { User } from "./user.schema";

@Schema()
export class Post extends Document {
	@Prop({ type: Types.ObjectId, required: true, ref: User.name })
	authorId: string;

	@Prop({ type: String, required: true })
	title: string;

	@Prop({ type: String })
	subTitle?: string;

	@Prop({ type: String, required: true })
	text: string;
}

export const PostSchema = SchemaFactory.createForClass(Post)