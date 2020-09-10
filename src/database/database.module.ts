import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import env from 'src/env';

@Module({
	imports: [
		MongooseModule.forRoot(env.MONGO_URL),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	providers: [UserService],
	exports: [UserService],
})
export class DatabaseModule {}
