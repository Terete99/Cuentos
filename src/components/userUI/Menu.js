import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


export class Menu extends Component {
  
  render() {
    
    return (
<div>
        <Navbar expand="lg" variant="info" bg="light">

          <Navbar.Brand >
            <DropdownButton id="dropdown-basic-button" title="TereUI">
             <Dropdown.Item onClick={ () => this.props.history.push('/cuentos') }>  Cuentos  </Dropdown.Item>            
              <Dropdown.Item onClick={ () => this.props.history.push('/cuento/nuevo') }>  Crear cuento  </Dropdown.Item>
              <Dropdown.Item onClick={ () => this.props.history.push('/listadocomentarios') }>Gestionar Comentarios</Dropdown.Item> 
            </DropdownButton>
          </Navbar.Brand>
          <Navbar.Brand >
          <DropdownButton id="dropdown-basic-button" title="Cuentos" >
             <Dropdown.Item onClick={ () => this.props.history.push('/UserCuentos') }>Cuentos</Dropdown.Item> 
          </DropdownButton>
          </Navbar.Brand>
          <DropdownButton  onClick={ () => this.props.history.push('/login') } id="dropdown-basic-button" title="Login">Login
          </DropdownButton>
        </Navbar>
        <img src="fondo.jpg" width="100%" alt="imagen"/>
        
       
      </div>


    )
  }
}
