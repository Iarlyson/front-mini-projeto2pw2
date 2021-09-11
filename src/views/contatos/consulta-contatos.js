import React from 'react';
import {withRouter} from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import ContatoService from '../../app/service/contatoService';
import UserService from '../../app/service/usuarioService';

import ContatoTable from './contatosTable';

import * as messagens from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


class ConsultaContatos extends React.Component{
    state = {
        nome:'',
        telefone:'',
        contatoDeletar:{},
        showConfirmDialog:false,
        contatos:[]
    }
    constructor(){
        super();
        this.service = new ContatoService();
        this.service2 = new UserService();

    }

 
    componentDidMount(){
        this.service.listar()
        .then(response =>{

           const contatos = response.data;
           console.log(       {contatos:response.data.contatos})
            

            if(contatos.length < 1){
                console.log( contatos)

                messagens.mensagemAlerta("Nenhum resultado encontrado.");
            }


         

            this.setState({contatos:response.data.contatos})
            const params = localStorage.getItem("user");
            if(params){
                this.service2
                    .obterPorEmail(params)
                    .then(response => {
                        if(response.data.user.manager === true){
    
                        this.setState( {atualizando: true} )
                    }
                    else{
                        this.setState( {atualizando: false} )

                    }
                    })
                   
            }
        
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

           const contatos = response.data;
           console.log(       {contatos:response.data.contatos})
            

            if(contatos.contatos.length < 1){
                console.log( contatos)

                messagens.mensagemAlerta("Nenhum resultado encontrado.");
            }

            this.setState({contatos:response.data.contatos})
        }).catch(error =>{
            console.log(error)
        })
    }
    buscar = () =>{
        const contatoFiltro = {
            nome: this.state.nome,

        }
        if(contatoFiltro.nome){
        this.service.consultar(contatoFiltro)
        .then(response =>{

            const contatos = response.data;

            console.log({contatos:[response.data.contato]})
      

            if(contatos.contato.length < 1){
                console.log( contatos)

                messagens.mensagemAlerta("Nenhum resultado encontrado.");
            }

            this.setState({contatos:response.data.contato})
        }).catch(error =>{
            console.log(error)
        })}else{
            messagens.mensagemAlerta("Preencha o campo Nome para buscar o contato")
        }
    }
    abrirConfirmacao = (contato) =>{
        this.setState({showConfirmDialog:true, contatoDeletar:contato})
    }
    cancelarDelecao = ()=>{
        this.setState({showConfirmDialog:false, contatoDeletar:{}})
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-contato/${id}`)
    }
    deletar = () =>{
        this.service
            .deletar(this.state.contatoDeletar.id)
            .then(response => {
                const contatos = this.state.contatos;
                const index = contatos.indexOf(this.state.contatoDeletar);
                contatos.slice(index, 1);
                this.setState(contatos)
                this.setState({contatos:contatos,showConfirmDialog:false, contatoDeletar:{}})
                messagens.mensagemSucesso('Contato deletado com Sucesso!')
                console.log(messagens.mensagemSucesso)
                window.location.reload();
            }).catch(error => {
                messagens.mensagemErro('Ocorreu um erro a deletar o contato')
            })
    }
    preparaFormularioCadastro=()=>{
        this.props.history.push('/cadastro-contato')
    }
    myConta = () =>{
        this.props.history.push(`/cadastro-usuarios/`)

    }
    sistemaAdm = () =>{
        this.props.history.push(`/consulta-usuarios/`)

    }
    
    render(){

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        
        return(
            <Card title= "Consultar Contato">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                        <button onClick={this.myConta} type="button" title="Minha Conta"className="btn btn-success"><i className="pi pi-search"></i> Minha Conta</button>
                            {this.state.atualizando?
                            (
                                <button className="btn btn-success" onClick={this.sistemaAdm}><i className="pi pi-users"></i> Administração</button>
                            ):(
                                console.log("Não adm")
                            )  

                        }
                        <button onClick={this.logout} type="Sair" title="Buscar"className="btn btn-danger"><i className="pi pi-sign-out"></i> Sair</button>

                            <FormGroup htmlFor="inputNome" label="Nome: *">
                                    <input type="text" 
                                        className="form-control" 
                                        id="inputNome"
                                        value={this.state.nome}
                                        onChange={e => this.setState({nome:e.target.value})} 
                                        placeholder="Digite o Nome" />
                            </FormGroup>
                            
                            <button onClick={this.buscar} type="button" title="Buscar"className="btn btn-success"><i className="pi pi-search"></i> Buscar</button>

                            <button onClick={this.listar} type="button" title="Buscar"className="btn btn-success"><i className="pi pi-list"></i> Listar tudo</button>
                            <button onClick={this.preparaFormularioCadastro} type="button" title="Cadastrar Contato" className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <ContatoTable 
                                contatos={this.state.contatos}
                                deleteAction={this.abrirConfirmacao}
                                editAction={this.editar} />
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