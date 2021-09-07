import React from 'react';
import {withRouter} from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import UserService from '../../app/service/usuarioService';
import UserTable from './usersTable';

import * as messagens from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaContatos extends React.Component{
    state = {
        usename:'',
        email:'',
        contatoDeletar:{},
        showConfirmDialog:false,
        users:[]
    }
    constructor(){
        super();
        this.service = new UserService();
    }
    componentDidMount(){
        this.service.listar()
        .then(response =>{

           const users = response.data;
           console.log(response.data.users.id)
            

            if(users.length < 1){
                console.log( users)

                messagens.mensagemAlerta("Nenhum resultado encontrado.");
            }

            this.setState({users:response.data.users})
        }).catch(error =>{
            console.log(error)
        })
    }

    logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push('/login');
    }


    listar = () =>{
        this.service.listar()
        .then(response =>{

           const users = response.data;
           //console.log(       {users:response.data.users})
            

            if(users.length < 1){
                console.log( users)

                messagens.mensagemAlerta("Nenhum resultado encontrado.");
            }

            this.setState({users:response.data.users})
        }).catch(error =>{
            console.log(error)
        })
    }
    buscar = () =>{
        const userFiltro = {
            email: this.state.email,

        }
        this.service.obterPorEmail(userFiltro.email)
        .then(response =>{

            const users = response.data;


            console.log({users:[response.data.user]})
      


            if(users.length < 1){
                console.log( users)

                messagens.mensagemAlerta("Nenhum resultado encontrado.");
            }

            this.setState({users:[response.data.user]})
        }).catch(error =>{
            console.log(error)
        })
    }
    abrirConfirmacao = (user) =>{
        this.setState({showConfirmDialog:true, userDeletar:user})
    }
    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false,userDeletar:{}})
    }


    deletar = () =>{
        this.service
            .deletar(this.state.userDeletar.id)
            .then(response => {
                const users = this.state.users;
                const index = users.indexOf(this.state.contatoDeletar);
                users.slice(index, 1);
                this.setState(users)
                this.setState({users:users,showConfirmDialog:false, userDeletar:{}})
                messagens.mensagemSucesso('Contato deletado com Sucesso!')
                window.location.reload();
            }).catch(error => {
                messagens.mensagemErro('Ocorreu um erro a deletar o contato')
            })
    }

    voltar = () =>{
        this.props.history.push(`/consulta-contatos/`)

    }
    
    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        
        return(
            <Card title= "Sistema de Administração de Usuários">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                        <button onClick={this.voltar} type="button" title="Voltar"className="btn btn-success"><i className="pi pi-backward"></i> Voltar</button>
                        <button onClick={this.logout} type="button" title="Sair"className="btn btn-danger"><i className="pi pi-sign-out"></i> Sair</button>

                            <FormGroup htmlFor="inputNome" label="Email: *">
                                    <input type="text" 
                                        className="form-control" 
                                        id="inputNome"
                                        value={this.state.email}
                                        onChange={e => this.setState({email:e.target.value})} 
                                        placeholder="Digite o email" />
                            </FormGroup>
                            
                            <button onClick={this.buscar} type="button" title="Buscar"className="btn btn-success"><i className="pi pi-search"></i> Buscar</button>

                            <button onClick={this.listar} type="button" title="Buscar"className="btn btn-success"><i className="pi pi-list"></i> Listar tudo</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                        <UserTable 
                                users={this.state.users}
                                deleteAction={this.abrirConfirmacao}
                           />
                        </div>
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
export default withRouter(ConsultaContatos);