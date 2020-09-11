import { Injectable } from '@nestjs/common';
import { JWT } from 'jose';
import env from 'src/env';
@Injectable()
export class AuthService {
	sign(id: string): string {
		return JWT.sign({ id }, env.SECRET, {
			expiresIn: '2 hours',
		});
	}
	verify(token: string): { id: string } | null {
		try {
			const result: any = JWT.verify(token, env.SECRET);
			if (!('id' in result)) return;

			return {
				id: result.id,
			};
		} catch {
			return null;
		}
	}
}
