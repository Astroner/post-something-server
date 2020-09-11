import { config } from 'dotenv';

config();


export default {
	PORT: +process.env.PORT || 8080,
	HOST: process.env.HOST,
	SECRET: process.env.SECRET || "test key",
	MONGO_URL: process.env.MONGO_URL,
};
