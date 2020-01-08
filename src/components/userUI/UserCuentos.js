import React, { Component } from 'react'
import { mongo } from '../../index'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'






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
            <div className="centrar fondo">
                <Carousel style={{ contentAlign: "center" }}  >
                    {this.state.cuentos.map((cuento, i) => {
                        return <Carousel.Item className="p-3 mb-2 bg-light text-dark" key={i} >
                            <div className="col-6">
                                <h2 className="p-3 mb-2 bg-white centrar" ><Link to={`/leercuento/${cuento._id}`} className="text-danger">{cuento.titulo}</Link> </h2>
                                <img
                                    className="d-block w-100"
                                    src={cuento.imagen}
                                    alt="First slide"
                                />
                            </div>
                        </Carousel.Item>
                    })}
                </Carousel>
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
            <div className="fondo">
                <h1 style={{ textAlign: "center", padding: "15px" }}>Cuentos</h1>
                <h3 style={{ textAlign: "center" }}>Click al botón para leer el cuento</h3>
                {this.state.cuentos.map((cuento, i) => {
                    return (
                        <div style={{ padding: "5%", width: "40%", float: 'left' }} key={i} className="div-card2">
                            <div className="colx fondo">
                                <h3>{cuento.titulo}</h3><br></br>
                                <img src={cuento.imagen} style={{ borderRadius: "8px", width: "300px" }} alt="Imagen no disponible" /><br></br><br></br>
                                <button type="button" className="btn btn-outline-primary btn-lg btn-block" style={{ borderRadius: "12px", fontSize: "24px" }}
                                    onClick={() => this.props.history.push(`/leercuento/${cuento._id}`)}
                                >Leer </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export class VideoCuento extends Component {
    state = { cuento: [], show: false 
     } 
                


    componentDidMount = () => { //traer listado videos, si la condicion afecta al mismo campo podemos hacer dos condiciones
        this.cuentos.aggregate([
            { $match: {video:{ $ne: "", $exists :true } }},
            //si le dices 1 solo te enseña 2 campos de cada documuento, el id y el video, ponemos 0 si no lo quiero ver
            // project filtra columnas
            { $project: { _id: 0, video: 1 , titulo: 1}}
        ])
        .toArray().then(c => {
            this.setState({ cuento: c})
            console.log(c)
        })
       
    }
    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      }

    cuentos = mongo.db('miapp').collection('cuentos')
    render() {
        return (
            <div className="fondo">
                 {this.state.cuento.map((cuento, i) => {
                    return (
                        <div className="text-center" key={i}>
                            <h3>{cuento.titulo}</h3>
                            
                            <div style={{textAlign:"right", paddingLeft:" 300px", margin:"40px"}}>
                            <ReactPlayer url={cuento.video}
                            onClick= {
                                this.showModal
                            } open/>
                            </div>
                           {/* <pre> {JSON.stringify(this.state.cuento, undefined, 2)} </pre> */}
                           </div>
                        
                 
                    )})
    }
                    </div>
                
                 
            
               
                    
        )
 
}
}





