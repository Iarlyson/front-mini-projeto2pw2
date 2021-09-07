import ApiService from '../apiservice'
export default class ContatoService extends ApiService{
    constructor(){
        super("/contato");
    }
   
    listar(){

        return this.get('/');
    }

    obterPorId(id){
        let params = `/${id}`

        return this.get(params);
    }


    consultar(contatoFiltro){
        let params = `/buscar/${contatoFiltro.nome}`

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
    salvar(contato){
        return this.post('/',contato)
    }
    atualizar(contato){
        return this.patch(`/${contato.id}`, contato)
    }
    
    
}