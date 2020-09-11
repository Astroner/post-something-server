import { Controller, Post, Body, BadRequestException, Headers, Get, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from 'src/dto/signin.dto';
import { UserService } from 'src/database/user/user.service';
import { AuthService } from 'src/auth/auth/auth.service';
import { SignUpDto } from 'src/dto/signup.dto';
import { Protected } from 'src/decorators/protected.decorator';
import { Id } from 'src/decorators/id.decorator';

@Controller('user')
export class UserController {

	constructor(
		private user: UserService,
		private auth: AuthService
	){}

	@Post('signin')
	async signin(@Body() login: SignInDto): Promise<{ token: string }> {
		const result = await this.user.verifyUser(login.email, login.password);
		if(!result) throw new BadRequestException("wrong username or password")

		return {
			token: this.auth.sign(result.id),
		};
	}

	@Post('signup')
	async signup(@Body() signup: SignUpDto): Promise<void> {
		await this.user.createUser(signup)
	}

	@Get('profile')
	@Protected()
	async profile(@Id() id: string): Promise<{ email: string, first_name: string, last_name: string }> {

		const user = await this.user.getUserById(id);

		if(!user) throw new UnauthorizedException();

		return user;
	}
}
