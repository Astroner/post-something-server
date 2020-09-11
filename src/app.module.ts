import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, DatabaseModule, PostsModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
