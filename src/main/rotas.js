import React from 'react'
import {HashRouter, Switch } from 'react-router-dom'
import Login from '../views/login'
import CadastroUser from '../views/user/cadastro'
import CadastroContato from '../views/contatos/cadastroContato';
import ConsultaContatos from '../views/contatos/consulta-contatos';
import ConsultaUsuarios from '../views/user/consulta-usuarios';

import Route from './../app/service/authService';




function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUser} />
                <Route path="/cadastro-contato/:id?" component={CadastroContato} isPrivate />
                <Route path="/consulta-contatos" component={ConsultaContatos} isPrivate/>
                <Route path="/consulta-usuarios" component={ConsultaUsuarios} isPrivate/>

            </Switch>
        </HashRouter>
    )
}
export default Rotas;