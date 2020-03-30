const connection = require('../database/connection');

module.exports = {

    //LISTA TODOS OS DADOS 
    async index(request, response){

        const { pages = 1 } = request.query;

        //QUERY PARA RETORNA A QUANTIDADE TOTAL DE CASOS
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((pages -1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);//ISSO IRA RETORNA O TOTAL DE CASOS REGISTRADO DE TERMINADA ONG

        return response.json(incidents);
    },

    async create(request,response) {
        const { title, description, value } = request.body;
        
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    async delete(request,response){

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if(incidents.ong_id != ong_id) {
                return response.status(401).json({error: 'Operação não permitida'});
            }

            await connection('incidents').where('id', id).delete();//DELETANDO USUARIO DO BANCO
            return response.status(204).send();
    }
};