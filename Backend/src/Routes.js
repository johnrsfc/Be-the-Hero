const express = require('express');
const {celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//ROTAS PARA LOGIN
routes.post('/session',SessionController.create);

//ROTA PARA LISTA TODAS AS ONGS QUE ESTÃO NO BANCO DE DADOS
routes.get('/ongs', OngController.index);

//CRIANDO ROTA DE CADASTRO DE ONGS/// VALIDANDO TODOS OS CAMPOS PARA CADASTRO DE ONG
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

//CRIANDO ROTA PARA LISTA INCIDENTS DE CADA ONG//// VALIDANDO O SE O ID ESTA CORRETO PARA LISTA INCIDENTES
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index);

//LISTANDO OS INCIDENTS//// validando a navegação do USERS
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        pages: Joi.number(),
    }),
}), IncidentController.index);

//CRIANDO OS INCIDENTS
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}) ,IncidentController.create);

//DELETANDO INCIDENTS//// VALIDANDO se o ID passado para deletar é o correto
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

module.exports = routes;