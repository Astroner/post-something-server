import { config } from 'dotenv';

config();


export default {
	PORT: +process.env.PORT,
	HOST: process.env.HOST,
	SECRET: process.env.SECRET,
	MONGO_URL: process.env.MONGO_URL,
};
