import React from 'react';
import {withRouter} from 'react-router-dom'
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import * as messages from '../../components/toastr';
import UsuarioService from '../../app/service/usuarioService';


import * as messagens from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
class CadastroUser extends React.Component{
    state = {
        username:'',
        email:'',
        password:'',

    }
    constructor(){
        super();
        this.service = new UsuarioService();
    }
    componentDidMount(){

        const params = localStorage.getItem("user");
        console.log(params)
        if(params){
            this.service
                .obterPorEmail(params)
                .then(response => {
                    console.log({...response.data});

                    this.setState( {...response.data.user, atualizando: true} )
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }
    submit=()=>{
        const UserASalvar = {
            username: this.state.username,
            email:this.state.email,
            password:this.state.password,

        }


        this.service
        .salvarUsuario(UserASalvar)
        .then(response =>{
            this.props.history.push('/login')
            messages.mensagemSucesso("Usuario salvo com sucesso!")
        }).catch(error =>{
            messages.mensagemErro(error.response.data)
        })
    }
    abrirConfirmacao = (user) =>{
        this.setState({showConfirmDialog:true, userDeletar:user})
    }
    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, userDeletar:{}})
    }
    deletaruser = () =>{
        this.service
            .deletar(this.state.id)
            .then(response => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                this.props.history.push('/login')
                messages.mensagemSucesso("Usuario Deletado com sucesso!")
                
            }).catch(error => {
                messagens.mensagemErro('Ocorreu um erro a deletar o contato')
            })
    }
    atualizar=()=>{
        const { username, email, id } = this.state;

        const UserAtualizar = { username, email, id };
        this.service
        .atualizar(UserAtualizar)
        .then(response =>{
            this.props.history.push('/Consulta-contatos')
            messages.mensagemSucesso("Usuario atualizado com sucesso!")
        }).catch(error =>{
            messages.mensagemErro(error.response.data)
        })
    }
    handlerChange = (event)=>{
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name] : value })
    }
    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletaruser} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return(
            <Card title= {this.state.atualizando ?'Atualização de Usuario':'Cadastro de Usuario'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputNome" label="UserName: *">
                            <input 
                                id="inputNome" 
                                type="text" 
                                className="form-control" 
                                name= "username"
                                value={this.state.username}
                                onChange={this.handlerChange}
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                        <FormGroup id="inputNome" label="Email: *">
                            <input 
                                id="inputNome" 
                                type="text" 
                                className="form-control" 
                                name= "email"
                                value={this.state.email}
                                onChange={this.handlerChange}
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        {this.state.atualizando?
                            (
                            console.log("sem atualização de senha")
                            ) : (
                                <div className="col-md-12">
                                <FormGroup id="inputTelefone" label="Senha: *">
                                    <input 
                                        id="inputTelefone" 
                                        type="password" 
                                        className="form-control" 
                                        name= "password"
                                        value={this.state.password}
                                        onChange={this.handlerChange}
                                        />
                                </FormGroup>    
                            </div>                            )

                        }
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando?
                            (
                                <button className="btn btn-primary" onClick={this.atualizar}><i className="pi pi-refresh"></i> Atualizar</button>
                            ) : (
                                <button className="btn btn-success" onClick={this.submit}><i className="pi pi-save"></i> Cadastrar</button>
                            )

                        }
                    </div>
                    <div className="col-md-6">
                        {this.state.atualizando?
                            (

                                <button type="button" title="Excluir" className="btn btn-danger"  onClick={this.abrirConfirmacao}>  <i className="pi pi-trash"></i>   </button>
                            ) : (
                                console.log("sem função de apagar")

                                )

                        }
                    </div>
                    <div className="col-md-6">
                        {this.state.atualizando?
                            (

                                <button className="btn btn-danger" onClick={e => this.props.history.push('/consulta-contatos')}><i className="pi pi-backward"></i> Voltar</button>
                                ) : (
                                <button className="btn btn-danger" onClick={e => this.props.history.push('/login')}><i className="pi pi-backward"></i> Login</button>

                                )

                        }
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão deste Contato?
                    </Dialog>
                </div> 
            </Card>
        )
    }
}
export default withRouter(CadastroUser);  