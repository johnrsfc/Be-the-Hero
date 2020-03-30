const crypto = require('crypto'); //METEODO NATIVO DO NODE PARA GERAR ID ALEAOTORIOS
const connection = require('../database/connection');//CONEXÃO COM BANCO
module.exports = {
    //ROTA PARA LISTA TODAS AS ONGS QUE ESTÃO NO BANCO DE DADOS
    async index(request,response)  {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    //CRIANDO ROTA DE CADASTRO DE ONGS
    async create(request,response){
        //acessando dados
    const {name, email, whatsapp, city, uf} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    //QUANDO CHEGAR AQUI O NODE VAI AGUARDA PÁRA DEPOIS CONTINUAR.
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf, 
    });

    return response.json({ id });
    }
}