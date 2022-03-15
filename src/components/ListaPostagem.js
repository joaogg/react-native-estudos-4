import React, { useState, useEffect } from 'react';
import firebaseDb from "firebase";
import { Link } from "react-router-dom";
const ListaPostagem = () => {

    var [currentId, setCurrentId] = useState('');
    var [contador, setContador] = useState('');
    var [contactObjects, setContactObjects] = useState({})


    useEffect(() => {
        firebaseDb.database().ref().child('postagem').on('value', snapshot => {
            if (snapshot.val() != null) {
                setContactObjects({
                    ...snapshot.val()
                });
            }
            setContador(snapshot.numChildren());
            //console.log(snapshot.numChildren());

        })
    }, [])

    const onDelete = id => {
        if (window.confirm('Tem certeza que deseja excluir essa postagem?')) {
            firebaseDb.database().ref().child(`postagem/${id}`).remove(
                err => {
                    if (err)
                        console.log(err);
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div class="col-sm-12 text-right">
                <h2>Nº Postagens: <span class="badge badge-secondary">{contador}</span></h2>
            </div>
            {Object.keys(contactObjects).map((key) => (
                <div class="col-sm-6" key={key}>
                    <div className="card mb-3" key={key}>
                        <div className="card-body" key={key}>
                            <h5 className="card-title">{contactObjects[key].titulo}</h5>
                            <p className="card-text">{contactObjects[key].mensagem}</p>
                            <p className="card-text"><small className="text-muted">{contactObjects[key].data}</small></p>
                            <a className="btn btn-danger" onClick={() => { onDelete(key) }}>Excluir</a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ListaPostagem;