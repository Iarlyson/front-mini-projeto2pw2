import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
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
                })
                .catch(erros => {
                    mensagemErro(erros.response.data)
                })
            
        }
    }
    
    entrar =  () => {
        this.service.autenticar({
            email:this.state.email,
            password:this.state.password
        }).then(response =>{

            this.props.history.push('/consulta-contatos')
        }).catch(erro => {
                        console.log("po")

            mensagemErro(erro.response.data)
        })  
        
    }
    prepareCadastrar = ()=> {
        this.props.history.push('/cadastro-usuarios')
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-6" style={{position:'relative',left:'300px'}} >
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label= "Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({email:e.target.value})} 
                                                        className="form-control" 
                                                        id="exampleInputEmail1" 
                                                        aria-describedby="emailHelp" 
                                                        placeholder="Digite o Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                        value={this.state.password}
                                                        onChange={e => this.setState({password:e.target.value})}  
                                                        className="form-control" 
                                                        id="exampleInputPassword1" 
                                                        placeholder="Password"/>
                                            </FormGroup>
                                            
                                            <button onClick={this.prepareCadastrar} className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
                                            <button onClick={this.entrar} className="btn btn-success"><i className="pi pi-sign-in"></i> Entrar</button>
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