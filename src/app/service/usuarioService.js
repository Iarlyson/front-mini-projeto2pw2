import ApiService from "../apiservice";


class UsuarioService extends ApiService{
    constructor(){
        super('/user')
    }

   
    listar(){

        return this.get('/');
    }

    async autenticar(usuario){

        let token =  await this.post('/login', usuario)
        localStorage.setItem("token", token.data.token)
        localStorage.setItem("user", usuario.email)

    }

    salvarUsuario(usuario){
        return this.post('/register',usuario)

    }
    obterPorEmail(email){      
        console.log(email);

        let params = `/${email}`

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    atualizar(usuario){
        return this.patch(`/${usuario.id}`, usuario)
    }
    
}
export default UsuarioService;