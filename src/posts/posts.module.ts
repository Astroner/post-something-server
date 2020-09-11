import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { PostsController } from './posts/posts.controller';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [PostsController]
})
export class PostsModule {}
