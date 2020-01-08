import React, { Component } from 'react'
import { UserCuentos, VideoCuento } from './UserCuentos'
// import { stitch } from '../..'



export class Menu extends Component {

  render() {
    //   let div = (<div className="registrar">
    //   <h1 style={{color:"blue"}}>¡Debes registrarte para ver el contenido!</h1>
    // </div>)

    return (
      <div className="fondo">
        {/* { !stitch.auth.isLoggedIn ? div : <span /> } */}
          <h1 style={{ textAlign: "center", padding: "5px" }}>Cuentos, Trabalenguas Y Adivinanzas </h1>
        <UserCuentos>
          </UserCuentos>
          <VideoCuento {...this.props}></VideoCuento>
      </div>

    )
  }
}