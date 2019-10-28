import React, { Component } from 'react'
import { mongo } from '../../index'
import { ObjectId } from 'bson'
import ReactPlayer from 'react-player'
import { Onecomentario } from '../tereUI/Comentario'
import { Link } from 'react-router-dom'
import { CuentoComponent } from '../tereUI/Cuento'




export class BotonLeerCuento extends Component {
    state = {
        cuento: new CuentoComponent()
    }
    componentDidMount = () => { //traer listado cuentos y pintar en pantalla
        this.cuento.findOne({ _id: new ObjectId(this.props.match.params.id) }).then(c => {
            this.setState({ cuento: c })
            console.log(c)
        })
    }

    cuento = mongo.db('miapp').collection('cuentos')

    render() {
        return (
            <div>

                {/* props del hijo al padre */}
                <LeerCuento {...this.state.cuento} />
                {/* {JSON.stringify(this.state.cuento)} */}
            </div>
        )
    }
}


class LeerCuento extends Component {
    state = {
        comentario: ''
    }

    // interfaz usuario pintar inputs que me traigan contenido de la base de datos 
    render() {
        return (
            <div className="div-leercuento" >
                <div className="modal-dialog modal-lg"  >

                    <div className="modal-content" >
                        <Link to="/usercuentos">Volver</Link>
                        <div className="div-leercuento" >
                            <h3>{this.props.tematica}</h3>
                            {/* le paso las props  */}
                            <img src={this.props.imagen} alt="No disponible" width="550px" />
                        </div>
                        <div className="div-leercuento" >
                            <h1 className="div-leercuento" >{this.props.titulo}</h1>
                            <p className="card-text">{this.props.argumento}</p>

                            <ReactPlayer width="700px" height="500px" url={this.props.video} className="div-leercuento" />
                            <h4><small className="text-muted">{this.props.moraleja}</small></h4>
                            <hr></hr>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <div className="container">
                            <h2>Comentarios</h2>
                            <p>Déjanos tu opinión</p>
                            {this.props.comentarios.map((c, i) => {
                                let muestra = c.estado === true ? <div key={i}> {c.texto} </div> : <span />
                                return <div key={i}> {muestra}

                                </div>
                            })}



                            <div className="inputComentarios">
                                <input className="form-control form-control-lg" onChange={(e) => {
                                    this.setState({ comentario: e.target.value })
                                }} ></input>
                            </div>
                            {/* //metemos comentarios al cuento */}
                            <button onClick={e => {
                                let comentario = new Onecomentario()
                                //meter el valor del input en nuevo comentario
                                comentario.texto = this.state.comentario
                                let copia = this.props.comentarios || []
                                //metemos el objeto comentario en el array comentarios
                                copia.push(comentario)
                                console.log(copia)
                                //grabar a la db
                                mongo.db('miapp').collection('cuentos').updateOne(
                                    { _id: new ObjectId(this.props._id) },
                                    { $set: { comentarios: copia } }
                                )
                            }} type="button" className="btn btn-primary">Enviar</button>
                            <br></br>

                        </div>


                    </div>
                </div>
            </div>


        )
    }



}





