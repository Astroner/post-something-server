import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/dto/signup.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private user: Model<User>) {}

    verifyUser(email: string, password: string): Promise<{ id: string } | null> {
        return new Promise((resolve, reject) => {
            this.user.findOne({ email, password }, (err, res) => {
                if(err) return reject(err)
                if(!res) return resolve(null)
                resolve({
                    id: res.id
                })
            })
        })
    }

    getUserById(id: string): Promise<{ email: string, first_name: string, last_name: string } | null> {
        return new Promise((resolve, reject) => {
            this.user.findById(id, (err, user) => {
                if(err) return reject(err)
                if(!user) return resolve(null)
                resolve({
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                })
            })
        })
    }

    createUser(data: SignUpDto): Promise<void> {
        return new Promise((resolve, reject) => {
            const user = new this.user(data);
            user.save({ validateBeforeSave: true }, (err) => {
                if(err) reject(err)
                else resolve()
            })
        })
    }

}
