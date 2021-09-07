import React from 'react';

export default props => {
    const rows =props.users.map(user =>{
        return(
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>

                <td>

                    <button type="button" title="Excluir" 
                        className="btn btn-danger"
                        onClick={e => props.deleteAction(user)}>
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
                    <th scope="col">Usename</th>
                    <th scope="col">Email</th>
                    <th scope="col">Deletar</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}