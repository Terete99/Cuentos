import React, { Component } from 'react'
import { mongo } from '../index'
// import ReactPlayer from 'react-player'

import { Link } from 'react-router-dom'

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
            <div>
                <Link to="/cuento/nuevo">Crear cuento</Link>
                {this.state.cuentos.map((cuento, i) => {
                    return <CardCuento key={i}
                        {...cuento} />
                })}

            </div>
        )
    }
}

class CardCuento extends Component {
    render() {
        return (

            <div className="div-card">

                <div style={{ padding: 20, textAlign: "center" }} >
                    <Link to={`/cuento/${this.props._id}`} className="card-img-top">{this.props.titulo}</Link>
                    <div className="w3-container w3-center">
                        <img src={this.props.imagen} heigth="100px" width="100px" alt="no hay imagen" />
                        {/* <ReactPlayer width="50" height="50" url={this.props.video} /> */}
                        <p>{this.props.texto}</p>
                    </div>

                </div>

            </div>


        )
    }

}
