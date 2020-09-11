import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from 'src/database/post/post.service';
import { Id } from 'src/decorators/id.decorator';
import { Protected } from 'src/decorators/protected.decorator';
import { CreatePostDto } from 'src/dto/createPost.dto';

@Controller('posts')
export class PostsController {
	constructor(private posts: PostService) {}

    @Get()
    async getAll(
        @Query("page") page: string | undefined
    ): Promise<ReturnType<PostService['all']>> {
        const p = Number(page) || 1;
        return this.posts.all(p);
    }

	@Get('id/:postId')
	async postById(
		@Param('postId') postId: string,
	): Promise<ReturnType<PostService['getPostById']>> {
		return await this.posts.getPostById(postId);
	}

	@Post('create')
	@Protected()
	async createPost(
		@Body() body: CreatePostDto,
		@Id() id: string,
	): Promise<ReturnType<PostService['createPost']>> {
		return await this.posts.createPost(
			id,
			body.title,
			body.text,
			body.subTitle,
		);
	}

	@Get('author/:authorId')
	async getAuthorPosts(
		@Param('authorId') authorId: string,
	): Promise<ReturnType<PostService['getAuthorsPosts']>> {
		return this.posts.getAuthorsPosts(authorId);
	}

    @Get('my-posts')
    @Protected()
	async getMyPosts(
        @Id() id: string
	): Promise<ReturnType<PostService['getAuthorsPosts']>> {
		return this.posts.getAuthorsPosts(id);
    }
}
