import { Users } from "@prisma/client";
import { userModel } from "../model/userModel";
import fs from 'fs';
import { sign }from 'jsonwebtoken';
import  {  userSchema } from '../interface.ts/userInterface';
import md5 from "md5";

interface IAllUser {
  code: number,
  data: Users[]
}

interface IUser {
  code: number,
  data?: Users | {},
  message?: string | {}
}

export class userService {

  static async getUsers(): Promise<IAllUser> {
    
    const allUsers = await userModel.getUsers();
    return {code: 200, data: allUsers};

  };

  static async checkIfExists(username: string): Promise<Users | null > {
  
    const user = await userModel.findOne(username);
    return user;

  };

  static generateToken(payload: Users) {
    const SECRET = fs.readFileSync('../back/jwt.evaluation.key');

    const token = sign({ payload }, SECRET, {
        algorithm: 'HS256',
        expiresIn: '24h',
    });
    return token;
  };

  static async createUser(newusername: string, password: string): Promise<IUser>{

 
    const response = userSchema.safeParse({newusername, password});
    if (!response.success) {
      return { code: 401, data: response.error };
    }

    const checkUser = await this.checkIfExists(newusername);

  

    if ( checkUser !== null) return {code: 409, message: 'already created'};

    const createdUser = await userModel.createUser(newusername, md5(password));
    const {username, accountId} = createdUser;

    const token = this.generateToken(createdUser);

    return {code: 201, data: {username, accountId, token}};

  }

}