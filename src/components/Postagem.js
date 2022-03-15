import React, { Component } from 'react';
import firebaseDb from "firebase";
import ListaPostagem from "./ListaPostagem";

class Postagem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            titulo: '',
            data: '',
            mensagem: '',
            alert: false,
            loading: false,
            messages: [],
            testList: [],
        };
    }

    onChangeTitulo = event => {
        this.setState({ titulo: event.target.value });
    }

    onChangeData = event => {
        this.setState({ data: event.target.value });
    }

    onChangeMensagem = event => {
        this.setState({ mensagem: event.target.value });
    }

    onCreateMessage = event => {
        firebaseDb.database().ref().child("postagem").push({
            titulo: this.state.titulo,
            data: this.state.data,
            mensagem: this.state.mensagem
        }).catch(error => {
            console.log(error);
        });

        this.setState({
            titulo: '',
            data: '',
            mensagem: '',
            alert: true
        });

        event.preventDefault();

    }


    render() {

        const isAlert = this.state.alert;
        return (
            <>
                <div class="col-lg-12">
                    {isAlert ? <>
                        <div className="alert alert-info">
                            <strong>Info!</strong> This alert box could indicate a neutral informative change or action.
                    </div>
                    </> : ''}

                    <form className="form-row" onSubmit={this.onCreateMessage}>
                        <div className="form-group col-md-6">
                            <label>Título:</label>
                            <input type="text" class="form-control" placeholder="Título" id="titulo" value={this.titulo} onChange={this.onChangeTitulo} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Data:</label>
                            <input type="datetime-local" class="form-control" id="data" value={this.data} onChange={this.onChangeData} />
                        </div>
                        <div class="form-group col-md-12">
                            <label>Mensagem:</label>
                            <textarea class="form-control" rows="5" id="mensagem" value={this.mensagem} onChange={this.onChangeMensagem} ></textarea>
                        </div>

                        <div class="form-group col-md-12">
                            <button type="submit" class="btn btn-primary">Cadastrar</button>
                        </div>
                    </form>
                    <br />
                </div>

                <ListaPostagem />

            </>
        );
    }
}

export default Postagem;