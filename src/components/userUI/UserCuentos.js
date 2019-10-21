import React, { Component } from 'react'
import { mongo } from '../../index'
import { Carousel } from 'react-bootstrap'
// import { Menu } from './Menu'

export class UserCuentos extends Component {
    state = { cuentos: [] }

    componentDidMount = () => { //traer listado cuentos
        this.cuentos.find().toArray().then(c => {
            this.setState({ cuentos: c })
        })
    }

    cuentos = mongo.db('miapp').collection('cuentos')
    render() {
        return (<div >
            {/* <Menu></Menu> */}
            <div className="row">
                <div className="col-4" >
                </div>
                <Carousel className="col-4" >
                    {this.state.cuentos.map((cuento, i) => {
                        return <Carousel.Item className="p-3 mb-2 bg-light text-dark" key={i}>
                            <div>
                                <h2 className="p-3 mb-2 bg-white" ><a href={`/leercuento/${cuento._id}`} className="text-danger">{cuento.titulo}</a> </h2>
                            
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









