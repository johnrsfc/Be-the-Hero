const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//ROTAS PARA LOGIN
routes.post('/session',SessionController.create);

//ROTA PARA LISTA TODAS AS ONGS QUE ESTÃO NO BANCO DE DADOS
routes.get('/ongs', OngController.index);

//CRIANDO ROTA DE CADASTRO DE ONGS
routes.post('/ongs', OngController.create);

//CRIANDO ROTA PARA LISTA INCIDENTS DE CADA ONG
routes.get('/profile', ProfileController.index);

//LISTANDO OS INCIDENTS
routes.get('/incidents', IncidentController.index);

//CRIANDO OS INCIDENTS
routes.post('/incidents', IncidentController.create);

//DELETANDO INCIDENTS
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;