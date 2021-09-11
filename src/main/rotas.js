import React from 'react'
import {HashRouter, Switch } from 'react-router-dom'
import Login from '../views/login'
import CadastroUser from '../views/user/cadastro'
import CadastroContato from '../views/contatos/cadastroContato';
import ConsultaContatos from '../views/contatos/consulta-contatos';
import ConsultaUsuarios from '../views/user/consulta-usuarios';
import erro404 from '../views/erro404';
import Route from './../app/service/authService';




function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/" exact={true} component={Login}/>
                <Route path="/login" exact={true} component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUser} title="Login" />
                <Route path="/cadastro-contato/:id?" component={CadastroContato} isPrivate />
                <Route path="/consulta-contatos" component={ConsultaContatos} isPrivate/>
                <Route path="/consulta-usuarios" component={ConsultaUsuarios} isPrivate/>
                <Route path="*" component={erro404}/>
            </Switch>
        </HashRouter>
    )
}
export default Rotas;