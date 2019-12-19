import React, { Component } from 'react'
import { UserCuentos } from './UserCuentos'



export class Menu extends Component {
 
  render() {

    return (
      <div className="fondo">
        <h1 style={{ textAlign: "center" }}>Cuentos, Trabalenguas Y Adivinanzas </h1>
        <UserCuentos>
        </UserCuentos>
      </div>


    )
  }
}