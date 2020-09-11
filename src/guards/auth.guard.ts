import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService
    ){}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const token = request.headers['authorization'];

        if (!token) throw new UnauthorizedException();

        const res = await this.auth.verify(token.split(" ")[1]);

        if (!res || !res.id) throw new UnauthorizedException();

        Object.defineProperty(request, 'user', {
            value: {
                id: res.id,
            },
        });

        return true
    }
}
