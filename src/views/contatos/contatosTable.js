import React from 'react';

export default props => {
    const rows =props.contatos.map(contato =>{
        return(
            <tr key={contato.id}>
                <td>{contato.nome}</td>
                <td>{contato.telefone}</td>
                <td>
                    <button type="button" title="Editar"
                        className="btn btn-primary"
                        onClick={e => props.editAction(contato.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir" 
                        className="btn btn-danger"
                        onClick={e => props.deleteAction(contato)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}