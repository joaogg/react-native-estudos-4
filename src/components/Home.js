import React from 'react';
import '../App.css';
import firebaseDb from "firebase";

function Home() {
 

  var ref = "vai si fude";

  return (

    <>
      <div className="col-6" >
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">tititi</h5>
                            <p className="card-text">msmsmsm</p>
                            <p className="card-text"><small className="text-muted">da</small></p>
                            <a href="#" className="btn btn-danger">Excluir</a>
                        </div>
                        </div>
                        </div>

                        <div className="col-6" >

                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">tititi</h5>
                            <p className="card-text">msmsmsm</p>
                            <p className="card-text"><small className="text-muted">da</small></p>
                            <a href="#" className="btn btn-danger">Excluir</a>
                        </div>
                        </div>
                        </div>


    </>

  );
}

export default Home;