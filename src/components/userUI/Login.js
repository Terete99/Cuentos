import React, { Component } from 'react';
import { UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import { stitch } from '../../index';



export class Login extends Component {
  state = {
    username: '',
    password: '',
  }


  login = () => {
    stitch.auth.loginWithCredential(new UserPasswordCredential(this.state.username, this.state.password))
      .then(() => {
        console.log(stitch.auth.user)
        window.location.href = '/'
      })
  }

  logout = () => {
    stitch.auth.logout()
      .then(n => window.location.href = '/')
  }

  render() {
    return (
      <div className="login" >
        <h4 style={{ textAlign: "center" }}>Inicia Sesión</h4>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          className="form-control"
          placeholder="Nombre de usuario" />&nbsp;
          <input
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
          className="form-control"
          placeholder="Contraseña" /><br></br>
        <button onClick={this.login} className="btn btn-primary"> Iniciar sesión</button> &nbsp;
          <button onClick={this.logout} className="btn btn-primary" > Cerrar sesión </button>
      </div>

    )
  }
}