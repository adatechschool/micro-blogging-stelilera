import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Post {
  static async findAll() {
    return await prisma.posts.findMany({
      include: { users: true }
    });
  }

  static async findOne(id) {
    return await prisma.posts.findUnique({
      where: { id: Number(id) },
    });
  }

  static async update(id, data) {
    return await prisma.posts.update({
      where: { id: Number(id) },
      data,
    });
  }

  static async delete(id) {
    return await prisma.posts.delete({
      where: { id: Number(id) },
    });
  }

  static async create(data) {
    console.log("DATA REÇUE PAR PRISMA : ", data);
    const post = await prisma.posts.create({
      data: {
        text: data.text,
        image: data.image,
        user_id: data.user_id
      },
      include: {
        users: true,
      }
    });
    return post;
  }
}
export default Post;