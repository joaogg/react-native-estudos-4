import React, { useState, useEffect} from 'react';
import firebaseDb from "firebase";
import {Link} from "react-router-dom";
const Lista = () => {


    const list = [
        {
            id: 'a',
            firstname: 'Robin',
            lastname: 'Wieruch',
            year: 1988,
        },
        {
            id: 'b',
            firstname: 'Dave',
            lastname: 'Davidds',
            year: 1990,
        },
    ];

    const lista = [];
    var [currentId, setCurrentId] = useState('');
    var [contactObjects, setContactObjects] = useState({})


    useEffect(() => {
        firebaseDb.database().ref().child('users').on('value', snapshot => {
            if (snapshot.val() != null) {
                setContactObjects({
                    ...snapshot.val()
                });
            }
        })
    }, [])

    const onDelete = id => {
        if (window.confirm('asmdkdsm?')) {
            firebaseDb.database().ref().child(`users/${id}`).remove(
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
        <div>
            {Object.keys(contactObjects).map((key) => (
                <ul key={key}>
                    <li key={key}>
                        <div>
                            {contactObjects[key].full_name} -
                            <Link to={`/user/${key}`}>ver</Link>

                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                deletar
                                            </a>
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default Lista;