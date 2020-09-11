import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Post, PostSchema } from './schemas/post.schema';
import { PostService } from './post/post.service';

import env from 'src/env';

@Module({
	imports: [
		MongooseModule.forRoot(env.MONGO_URL),
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Post.name, schema: PostSchema },
		]),
	],
	providers: [UserService, PostService],
	exports: [UserService, PostService],
})
export class DatabaseModule {}
