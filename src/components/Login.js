import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebaseDb from "../firebase";

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        firebaseDb.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => { 
            console.log(u);
            window.location='/Perfil'; 

        }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        firebaseDb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch((error) => {
                console.log(error);
            })
    }
    render() {
        return (
            <div className="col-md-4 offset-md-4">
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">E-mail:</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Senha:</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login} class="btn btn-primary">Acessar</button>
                    <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Cadastrar-se</button>
                </form>

            </div>
        );
    }
}
export default Login;
