import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';

@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private post: Model<Post>) {}

	async createPost(
		authorId: string,
		title: string,
		text: string,
		subTitle?: string,
	): Promise<{ id: string; title: string; text: string; subTitle?: string }> {
		const post = new this.post({
			title,
			authorId,
			text,
			subTitle,
		});
		await post.save();

		return {
			id: post.id,
			title: post.title,
			text: post.text,
			subTitle: post.subTitle,
		};
	}

	async getAuthorsPosts(
		authorId: string,
	): Promise<
		{ id: string; title: string; text: string; subTitle?: string }[]
	> {
		const results = await this.post.find({ authorId });

		return results.map(post => ({
			id: post.id,
			title: post.title,
			text: post.text,
			subTitle: post.subTitle,
		}));
	}

	async getPostById(
		postId: string,
	): Promise<{
		id: string;
		title: string;
		text: string;
		subTitle?: string;
		author: {
			id: string;
			email: string;
		};
	} | null> {
		const post = await this.post.findById(postId).populate('authorId');
		if (!post) return null;

		return {
			id: post.id,
			title: post.title,
			text: post.text,
			subTitle: post.subTitle,
			author: {
				id: (post.authorId as any).id,
				email: (post.authorId as any).email,
			},
		};
	}

	async all(
		page = 1,
	): Promise<{
		page: number;
		hasNext: boolean;
		results: {
			id: string;
			title: string;
			text: string;
			subTitle?: string;
			author: { id: string; email: string };
		}[];
	}> {
		const pageSize = 10;
		const [size, posts] = await Promise.all([
			this.post.estimatedDocumentCount(),
			this.post
				.find()
				.skip(pageSize * (page - 1))
				.limit(10)
				.populate('authorId')
		])

		return {
			page,
			hasNext: (size - pageSize * page) > 0,
			results: posts.map(post => ({
				id: post.id,
				title: post.title,
				text: post.text,
				subTitle: post.subTitle,
				author: {
					id: (post as any).authorId.id,
					email: (post as any).authorId.email,
				},
			}))
		}
	}
}
