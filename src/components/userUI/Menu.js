import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { UserCuentos } from './UserCuentos'
// import { Login } from './Login'




export class Menu extends Component {
  render() {
    return (

      <div>
        <Navbar expand="lg" variant="info" bg="light">

          <Navbar.Brand >
            <DropdownButton id="dropdown-basic-button" title="TereUI">
              <Dropdown.Item href="/cuentos">Cuentos</Dropdown.Item>
              <Dropdown.Item href="/cuento/nuevo">Crear cuento</Dropdown.Item>
              <Dropdown.Item href="/listadocomentarios/">Gestionar Comentarios</Dropdown.Item>
            </DropdownButton>
          </Navbar.Brand>
          <Navbar.Brand >
          <DropdownButton id="dropdown-basic-button" title="Cuentos" href="/UserCuentos">
          </DropdownButton>
          </Navbar.Brand>
          <DropdownButton id="dropdown-basic-button" title="Login" href="/Login">
          </DropdownButton>
        </Navbar>
        <UserCuentos></UserCuentos>
      </div>


    )
  }
}
