const request = require('supertest');
const app = require ('../../src/app');
const connection = require ('../../src/database/connection');

describe('ONG', () => {
beforeEach( async() => {
    await connection.migrate.rollback();//LIMPANDO O BANCO DE DADOS ANTES DE ESCUTAR O TEST
    await connection.migrate.latest();
});

    afterAll( async() => {
        await connection.destroy();
    });
    it('should be able to create a new ONG', async() => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "Luis e Mel",
            email: "luisemel@hotmail.com",
            whatsapp:"011987676043",
            city: "São Paulo",
            uf:"SP"
        });


        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});