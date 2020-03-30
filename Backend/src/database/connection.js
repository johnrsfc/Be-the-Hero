const knex = require('knex');
const configuration = require('../../knexfile');//IMPORATANDO TODAS A CONFIGURAÇÃO DO KNEXFILE

const connection = knex(configuration.development);

module.exports = connection;