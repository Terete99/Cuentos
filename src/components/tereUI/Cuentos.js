import React, { Component } from 'react'
import { mongo } from '../../index'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
export class Cuentos extends Component {
    state = { cuentos: [] }

    componentDidMount = () => {
        //traer listado cuentos, pintar en cuanto se cargue la página
        this.cuentos.find().toArray().then(c => {
            this.setState({ cuentos: c })
            console.log(c)
        })
    }
    cuentos = mongo.db('miapp').collection('cuentos')
    render() {

        return (

            <div className="fondo">
                <Navbar variant="light" bg="light">
                    <Nav.Link onClick={ () => this.props.history.push('/cuento/nuevo') }>  Crear cuento </Nav.Link>
                    <Nav.Link onClick={ () => this.props.history.push('/listadocomentarios') }>  Listado Comentarios </Nav.Link>
                    <Nav.Link onClick={ () => this.props.history.push('/trabalenguas')}> Crear Trabalenguas </Nav.Link>
                    <Nav.Link onClick={ () => this.props.history.push('/adivinanza')} >  Crear Adivinanza </Nav.Link>
                </Navbar>

                {this.state.cuentos.map((cuento, i) => {
                    return <CardCuento key={i}
                        {...cuento} />
                })}
            </div>
        )
    }
}

export class CardCuento extends Component {
    render() {
        return (
            <div className="fondo" >
                <div className="div-card " >

                    <div style={{ padding: 20, textAlign: "center" }} >
                        <Link to={`/cuento/${this.props._id}`} className="card-img-top">{this.props.titulo}</Link>
                        <div className="w3-container w3-center">
                            <img src={this.props.imagen} heigth="100px" width="100px" alt="no hay imagen" />
                            <p>{this.props.texto}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
