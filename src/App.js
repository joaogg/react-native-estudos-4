import React, { Component } from 'react';
import './App.css';
import Contacts from './components/Contacts';
import Sobre from './components/Sobre';
import Home from './components/Home';
import Login from './components/Login';
import Contatos1 from './components/Contatos';
import Perfil from './components/Perfil';
import Lista from './components/Lista';
import User from './components/User';
import Postagem from './components/Postagem';
import firebase from "firebase";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

  constructor() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }

    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    const username = localStorage.getItem('@welcome-app/username');

    this.authListener(); 
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {

    let exibeRota;
    var user = firebase.auth().currentUser;

    if (user) {
      exibeRota = <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <a class="navbar-brand" href="#">React + Firebase JoaoG</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Perfil">Perfil</a>
          </li>          
          <li class="nav-item">
            <a class="nav-link" href="/Postagem">Criar Postagem</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Contatos1">Contatos Tutorial 1.0</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Lista">Contatos Tutorial Lista 1.0</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Contatos">Contatos Tutorial</a>
          </li>                    
          <li class="nav-item">
            <a class="nav-link" href="/Sobre">Sobre</a>
          </li>
        </ul>
      </div>
    </nav>;
    } else {
      exibeRota = <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <a class="navbar-brand" href="#">React + Firebase JoaoG</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Contatos">Contatos Tutorial</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Sobre">Sobre</a>
            </li>
          </ul>
        </div>
      </nav>;
    }

    return (
      <body>
        {exibeRota}

        <div className="jumbotron text-center">
          <h1>React + Firebase JoaoG</h1>
          <p>Site para testes e apredizado!</p>
        </div>

        <div className="container">
          <div className="row">
            <Router>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/Sobre">
                  <Sobre />
                </Route>
                <Route path="/Perfil">
                  <Perfil />
                </Route>
                <Route path="/Login">
                  <Login />
                </Route>
                <Route path="/Contatos">
                  <Contacts />
                </Route>
                <Route path="/Contatos1">
                  <Contatos1 />
                </Route>
                <Route path="/Lista">
                  <Lista />
                </Route>
                <Route path="/Postagem">
                  <Postagem />
                </Route>
                <Route path="/User/:id">
                  <User />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </body >
    );
  }
}

export default App;

