import React from 'react';
import Card from '../components/card';
import {withRouter} from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
import {mensagemErro} from '../components/toastr'
class Login extends React.Component{
    state= {
        email:'',
        password:'',
    }
    constructor(){
        super();
        this.service = new UsuarioService();
    }

    componentDidMount(){
        const params = localStorage.getItem("user");
        if(params){
            this.service
                .obterPorEmail(params)
                .then(response => {
                   if(response.data){
                    this.props.history.push('/consulta-contatos');
                   }
                   else{
                    this.props.history.push('/login');

                   }
                })
                .catch(erros => {
                    mensagemErro(erros.response.data)
                })
            
        }
        else{
            this.props.history.push('/login');
        }
    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={{position:'relative',left:'300px'}} >
                    <div className="bs-docs-section">
                        <Card title="Pagina não encontrada - erro 404">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>

                                       </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);