import React, { Component } from 'react';
import '../App.css';
import firebaseDb from "firebase";

class Contatos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            loading: false,
            messages: [],
            testList: [],
        };
    }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    }

    onCreateMessage = event => {
        console.log("???");
        var usersRef = firebaseDb.database().ref().child("users");
        usersRef.push({
            date_of_birth: this.state.text,
            full_name: "Alan Turing"
        });

        this.setState({ text: '' });

        firebaseDb.database().ref().child("users").once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childSnapshot.val().full_name);
                // ...
            });
        });

        event.preventDefault();
    }

    componentDidMount() {

        firebaseDb.database().ref().child("users").on('value', snapshot => {
            console.log("putamadre" + snapshot);



            snapshot.forEach(childSnapshot => {
                const result = Object.values(childSnapshot);
                console.log("kkk " + childSnapshot.val());
                this.setState({
                    testList: childSnapshot
                });
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                //console.log(childSnapshot.val().full_name);
            });
        });




    }

    

    render() {

        console.log("q poha " + this.state.testList);

        return (
            <div>
                <form onSubmit={this.onCreateMessage}>
                    <input type="text" value={this.text} onChange={this.onChangeText} />
                    <button className="btn btn-primary" type="submit">Send</button>
                </form>
                {this.state.testList.forEach(z =>
                    <p>{z}asmdk</p>)}

            </div>
        );
    }
}

export default Contatos;
