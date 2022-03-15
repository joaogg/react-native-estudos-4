import React, { Component } from 'react';
import '../App.css';
import firebaseDb from "firebase";

class Perfil extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            uid: '',
            password: '',
            triste: ''
        };

        this.authListener = this.authListener.bind(this);
        this.signOut = this.signOut.bind(this);
        this.xd = this.xd.bind(this);

    }

    componentDidMount() {
        this.authListener();

        var contador;
        firebaseDb.database().ref("contacts").on("child_added", function (snapshot) {
            //console.log(snapshot.numChildren());
            contador = snapshot.numChildren().toString();
            console.log(snapshot.numChildren());
            console.log("asdm " + contador);

        });

        var kkk = firebaseDb.database().ref("contacts").once("value").then(function (snapshot) {
            return snapshot;
        });

        //this.state.triste = kkk.numChildren();

        //firebaseDb.database().ref("contacts").once("value").then().numChildren();

        console.log("tnc = " + kkk);

    }

    xd() {
        firebaseDb.database().ref("contacts").once("value").then(function (snapshot) {
            return snapshot.numChildren();
        });
    }

    authListener() {
        firebaseDb.auth().onAuthStateChanged((user) => {

            var user = firebaseDb.auth().currentUser;
            var name, email, photoUrl, uid, emailVerified;


            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;
                console.log(user.email);
                this.state.email = user.email;
                this.state.uid = user.uid;

            }

            if (user) {
                this.setState({ user });
                localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem('user');
            }
        });
    }

    signOut() {
        firebaseDb.auth().signOut().then(function () {
            window.location = '/Login';
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {
       
        return (
            <div className="col-md-12">
                <h2>Nome: {this.state.email}.</h2>
                <h2>ID: {this.state.uid}.</h2>
                <h2>COUNT: {this.state.triste}.</h2>
                <button onClick={this.signOut} style={{ marginLeft: '25px' }} className="btn btn-success">SignOut</button>
            </div>
        );
    }
}

export default Perfil;
