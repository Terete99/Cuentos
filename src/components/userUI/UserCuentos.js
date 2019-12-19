import React, { Component } from 'react'
import { mongo } from '../../index'
import Carousel from 'react-bootstrap/Carousel'



export class UserCuentos extends Component {
    state = { cuentos: [] }

    componentDidMount = () => { //traer listado cuentos
        this.cuentos.find().toArray().then(c => {
            this.setState({ cuentos: c })
        })
    }

    cuentos = mongo.db('miapp').collection('cuentos')
    render() {
        return (<div className="fondo centrar" >
            <div className="row centrar" >
                <div className="col-4" >
                    
                </div> 
                <Carousel className="col-4" style={{ textAlign: "center" }}  >
                    {this.state.cuentos.map((cuento, i) => {
                        return <Carousel.Item className="p-3 mb-2 bg-light text-dark" key={i} >
                            <div >
                                <h2 className="p-3 mb-2 bg-white centrar" ><a href={`/leercuento/${cuento._id}`} className="text-danger">{cuento.titulo}</a> </h2>
                                <img
                                    className="d-block w-100"
                                    src={cuento.imagen}
                                    alt="First slide"
                                />
                            </div>
                        </Carousel.Item>
                    })}
                </Carousel>
                
                <div className="col-4" >
                </div>
            </div>
        </div>
        )
    }
}

export class SelecCuentos extends Component {
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
                {this.state.cuentos.map((cuento, i) => {
                    return (
                        <div style={{ padding: 10, width: "50%", float: 'left' }} key={i} className="div-card2">
                            {/* <div className="colx"> */}
                            <h3>{cuento.titulo}</h3><br></br>
                            <img src={cuento.imagen} style={{ borderRadius: "8px", width: "300px" }} alt="Imagen no disponible" /><br></br><br></br>
                            <button type="button" className="btn btn-outline-primary btn-lg btn-block" style={{ borderRadius: "12px", fontSize: "24px" }}
                                onClick={() => this.props.history.push(`/leercuento/${cuento._id}`)}
                            >Leer </button>
                            {/* </div> */}
                        </div>
                    )
                })}
            </div>

        )
    }

}










