import request from 'supertest'
import { server } from '..';

describe('Tests des routes utilisateur', () => {
    
    test('Création d\'un utilisateur valide', async () => {
        const response = await request(server)
            .post('/register')
            .send({ 
                name: 'testRaissa',
                lastname: 'testAli',
                mail: 'testRaissa@example.com', 
                password: 'password123' 
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('name', 'testRaissa');
        expect(response.body.user).toHaveProperty('lastname', 'testAli');
        expect(response.body.user).toHaveProperty('mail', 'testRaissa@example.com');    
    });

    test('Connexion avec un utilisateur valide', async () => {
        const response = await request(server)
            .post('/login')
            .send({ 
                mail: 'raissa.ali@test.fr', 
                password: 'Raissa91' 
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('token'); // Vérifie que le token est bien généré
    });

    test('Connexion échoue avec un mauvais mot de passe', async () => {
        const response = await request(server)
            .post('/login')
            .send({ 
                mail: 'raissa.ali@test.fr', 
                password: 'raissa91' 
            });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('e');
    });
});