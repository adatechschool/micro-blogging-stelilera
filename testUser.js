import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    static async findAll() {
        return await prisma.user.findMany()
    }
};

(async () => {
    try {
        const users = await User.findAll();
        console.log("Utilisateurs récupérés :", users); // Affiche les utilisateurs dans la console
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
    } finally {
        await prisma.$disconnect();
    }
})();
