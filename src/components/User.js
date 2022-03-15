import React, { useState, useEffect } from 'react';
import '../App.css';
import firebaseDb from "firebase";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

const User = () => {
    
    const { id } = useParams();

const [fruit, setFruit] = useState('');


    useEffect(() => {
        firebaseDb.database().ref("users").child(id).once("value").then(snapshot =>

            console.log(snapshot.value())
        ).catch(error => ({
            errorCode: error.code,
            errorMessage: error.message
        }));



        firebaseDb.database().ref('/users/' + id).once('value').then(function (snapshot) {
    console.log("objeto??? = > " + snapshot.values);
    //var arr3 = Object.values(snapshot);
    //console.log("objeto??? = > " + arr3);

    //setFruit({...Object.values(snapshot.val())});
    setFruit(snapshot.val().full_name); 
    console.log("name?? " );
        });

    }, [])

    // mds q cara bom
    // https://stackoverflow.com/questions/52435658/getting-a-specific-object-item-by-id-in-firebase


    return (
        <div className="col-md-12">
            User ID {id}  {fruit}
        </div>
    );

}
export default User;
