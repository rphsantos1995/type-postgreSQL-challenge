import { Users, PrismaClient } from '@prisma/client'


export class userModel {

  static async getUsers(): Promise<Users[]> {

    const prisma = new PrismaClient();
    const getAll = await prisma.users.findMany();
    await prisma.$disconnect();
    return getAll;

  } 

  static async findOne(username: string): Promise<Users | null > {

    const prisma = new PrismaClient();
    const user = await prisma.users.findUnique({ where: {username} });
    await prisma.$disconnect();

    return user;

  }

  static async createUser(username: string, password: string): Promise<Users> {

    const prisma = new PrismaClient();

    const createdUser = await prisma.users.create({data:{
  
      username,
      password,
      account:{
        create:{
          balance: 100
        },
      }
    }});

    await prisma.$disconnect();
    return createdUser;
  }

};
