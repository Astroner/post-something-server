import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [AuthService],
	controllers: [UserController],
})
export class UserModule {}
