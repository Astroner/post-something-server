import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/dto/signup.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private user: Model<User>) {}

    async verifyUser(email: string, password: string): Promise<{ id: string } | null> {
        const result = await this.user.findOne({ email, password });
        if(!result) return null;
        return {
            id: result.id
        }
    }

    async getUserById(id: string): Promise<{ email: string, first_name: string, last_name: string } | null> {
        const user = await this.user.findById(id);
        if(!user) return null
        return {
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
		};
    }

    async createUser(data: SignUpDto): Promise<void> {
        const user = new this.user(data);
        try {
		    await user.save({ validateBeforeSave: true });
        }catch(e){
            if(e.name === "MongoError") {
                if(e.keyPattern?.email) {
                    throw new BadRequestException({
                        email: "User already exists"
                    })
                }
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}
