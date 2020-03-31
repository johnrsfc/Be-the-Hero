import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Logon from './pages/Logon';//ROTAS DE LOGIN

import Register from './pages/Register';//ROTAS DE REGISTRO

import Profile from './pages/Profile'; //ROTAS PARA LISTAR CASOS CADASTRADOS

import NewIncidents from './pages/NewIncidents'; //ROTAS PARA CADASTRA NOVO CASO

export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>

                <Route path="/register" component={Register}/>

                <Route path="/profile" component={Profile}/>

                <Route path="/incidents" component={NewIncidents}/>
            </Switch>
        </BrowserRouter>
    );
}