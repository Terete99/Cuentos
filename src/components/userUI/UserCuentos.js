import React, { Component } from 'react'
import { mongo } from '../../index'
import { Link } from 'react-router-dom'

export class UserCuentos extends Component {
    state = { cuentos: [] }

    componentDidMount = () => { //traer listado cuentos
        this.cuentos.find().toArray().then(c => {
            this.setState({ cuentos: c })
        })
    }
    cuentos = mongo.db('miapp').collection('cuentos')
    render() {

        return (
            <div>
                <Link to="/cuentos">TereUI</Link>

                {this.state.cuentos.map((cuento, i) => {
                    return <UserCuentosCard key={i}
                        {...cuento} />
                })}
            </div>
        )
    }
}
class UserCuentosCard extends Component {
    render() {
        return (

            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{this.props.titulo}</h4>
                    </div>
                    <div className="modal-body">
                        <img src={this.props.imagen} width="400px" alt="No disponible" />
                    </div>
                    <div className="modal-footer">
                        <Link to={`/leercuento/${this.props._id}`} className="btn btn-primary">Ver cuento</Link>
                    </div>
                </div>
            </div>


        )
    }
}

