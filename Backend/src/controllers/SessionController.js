const connection = require('../database/connection');//CONEXÃO COM BANCO
module.exports = {
    async create(request, response){

        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if(!ong){
            return response.status(400).json({ erro: 'Não exisitir a ONG Com Esse ID' });
        }

        return response.json(ong);

    }
}