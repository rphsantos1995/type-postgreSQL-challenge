import { Users } from "@prisma/client";
import { userModel } from "../model/userModel";
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import  {  userSchema, IAllUser, IUser } from '../interfaces/IUser';
import validateJWT from "../auth/validateJWT";
import bcrypt from 'bcrypt';


export class userService {

  static async getUsers(): Promise<IAllUser> {
    
    const allUsers = await userModel.getUsers();
    return {code: 200, data: allUsers};

  };

  static async checkIfExists(username: string): Promise<Users | null > {
  
    const user = await userModel.findByName(username);
    return user;

  };

  static async getUserInfo(token: string) {

    try {
      const decoded = validateJWT(token);

      if (typeof decoded === 'object') {
        const userInfo = await userModel.findByName( decoded.email);
        return userInfo?.id;
      }
      
    } catch (err) {
      
    }

  };

  static generateToken(payload: Users | null) {

    const SECRET = fs.readFileSync('../back/jwt.evaluation.key');

    const token = sign({ payload }, SECRET, {
        algorithm: 'HS256',
        expiresIn: '24h',
    });

    return token;
    
  };

  static async validateCredentials (username: string, pass: string) {

    const user = await userModel.findByName(username);
    const encryption = await bcrypt.compare(pass, String(user?.password));
    
    return { user, encryption};
    
  }

  static async loginUser (username: string, password: string) {

    try {

      const validation = await this.validateCredentials(username, password);
    
      if (!validation.encryption) return {code:401, data:"Invalid credentials"};
  
      const accountId = Number(validation.user?.accountId);
      const balance = await userModel.balanceById(accountId);

      const loginToken = this.generateToken(validation.user);
      
      return {code: 200, data: {loginToken, accountId, balance}}
      
    } catch (error) {

      return {code: 500, data: error}
      
    }

  }

  static async createUser(newusername: string, password: string): Promise<IUser>{

    try {
      
      const response = userSchema.safeParse({newusername, password});
      const checkUser = await this.checkIfExists(newusername);
  
      if (!response.success) {
        return { code: 401, data: response.error };
      }
  
      if ( checkUser !== null) {
        return {code: 409, message: 'already created'};
      }
  
      const hashPass = await bcrypt.hash(password, 10);
  
      const createdUser = await userModel.createUser(newusername, hashPass);
      const {username, accountId} = createdUser;
  
      const token = this.generateToken(createdUser);
  
      return {code: 201, data: {username, accountId, token}};

    } catch (error) {

      return {code: 500, data: error};
      
    }

  }

}