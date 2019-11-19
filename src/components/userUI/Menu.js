import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { mongo } from '../../index'


export class Menu extends Component {
  state = { tematicas: [] }

  trabalenguas = mongo.db('miapp').collection('trabalenguas')
  componentDidMount = () => {

    this.trabalenguas.aggregate([
      { $group: { _id: "$tematica" } }
    ])
      .toArray().then(t => {
        this.setState({ tematicas: t })
        console.log(t)
      })
  }



  render() {

    return (
      <div>
      <div >

        <Navbar expand="lg" variant="info" bg="light">

          <Navbar.Brand  >
            <DropdownButton id="dropdown-basic-button" title="TereUI">
              <Dropdown.Item onClick={() => this.props.history.push('/cuentos')}>  Cuentos  </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.history.push('/cuento/nuevo')}>  Crear cuento  </Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.history.push('/listadocomentarios')}>Gestionar Comentarios</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.history.push('/trabalenguas')}>Gestionar Trabalenguas</Dropdown.Item>
            </DropdownButton>
          </Navbar.Brand>
          <Navbar.Brand >
            <DropdownButton id="dropdown-basic-button" title="Cuentos" >
              <Dropdown.Item onClick={() => this.props.history.push('/UserCuentos')}>Cuentos</Dropdown.Item>
            </DropdownButton>
          </Navbar.Brand>
          <DropdownButton onClick={() => this.props.history.push('/login')} id="dropdown-basic-button" title="Login">Login
          </DropdownButton> &nbsp;&nbsp;&nbsp;&nbsp;
          {/* <Navbar.Brand > */}
          <DropdownButton id="dropdown-basic-button" title="Trabalenguas">
            {this.state.tematicas.map((tema, i) => {
              return (<Dropdown.Item key={i} onClick={e => this.props.history.push(`/trabalenguasuser/${tema._id}`)} >{tema._id}</Dropdown.Item>)
            })}
          </DropdownButton>
          {/* </Navbar.Brand> */}
        </Navbar>

      </div>
      <div className="fondo">
      </div>
</div>
    )
  }
}
