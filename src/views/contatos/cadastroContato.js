import React from 'react';
import {withRouter} from 'react-router-dom'
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import * as messages from '../../components/toastr';
import ContatoService from '../../app/service/contatoService';

class CadastroContato extends React.Component{
    state = {
        nome:'',
        telefone:'',
        usuario:null,
    }
    constructor(){
        super();
        this.service = new ContatoService();
    }
    componentDidMount(){
        const params = this.props.match.params
       console.log(params.id);
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    console.log({...response.data.contato});
                    this.setState( {...response.data.contato, atualizando: true} )
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                })
        }
    }
    submit=()=>{
        const contatoASalvar = {
            nome: this.state.nome,
            telefone:this.state.telefone,
        }
        this.service
        .salvar(contatoASalvar)
        .then(response =>{
            this.props.history.push('/consulta-contatos')
            messages.mensagemSucesso("Contato salvo com sucesso!")
        }).catch(error =>{
            messages.mensagemErro(error.response.data)
        })
    }
    atualizar=()=>{
        const { telefone, nome, id } = this.state;

        const contatoAAtualizar = { telefone, nome, id };
        this.service
        .atualizar(contatoAAtualizar)
        .then(response =>{
            this.props.history.push('/consulta-contatos')
            messages.mensagemSucesso("Contato atualizado com sucesso!")
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
        return(
            <Card title= {this.state.atualizando ?'Atualização de Contato':'Cadastro de Contato'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputNome" label="Nome: *">
                            <input 
                                id="inputNome" 
                                type="text" 
                                className="form-control" 
                                name= "nome"
                                value={this.state.nome}
                                onChange={this.handlerChange}
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-12">
                        <FormGroup id="inputTelefone" label="Telefone: *">
                            <input 
                                id="inputTelefone" 
                                type="text" 
                                className="form-control" 
                                name= "telefone"
                                value={this.state.telefone}
                                onChange={this.handlerChange}
                                />
                        </FormGroup>    
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando?
                            (
                                <button className="btn btn-primary" onClick={this.atualizar}><i className="pi pi-refresh"></i> Atualizar</button>
                            ) : (
                                <button className="btn btn-success" onClick={this.submit}><i className="pi pi-save"></i> Salvar</button>
                            )

                        }
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/consulta-contatos')}><i className="pi pi-backward"></i> Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroContato);  