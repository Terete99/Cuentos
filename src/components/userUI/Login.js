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
      <div className="fondo">
        
        <div className="container">

          <br />
          <div className="form-inline">
            <input
              onChange={e => this.setState({ username: e.target.value })}
              className="form-control"
              placeholder="nombre de usuario" />&nbsp;
          <input
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              className="form-control"
              placeholder="password" />&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.login} className="btn btn-primary"> Stitch Login </button> &nbsp;
          <button onClick={this.logout} className="btn btn-primary"> Logout </button>

          </div>
        </div>
      </div>
    )
  }
}