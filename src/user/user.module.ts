import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [DatabaseModule, AuthModule],
	controllers: [UserController],
})
export class UserModule {}
