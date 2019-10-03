import React, { Component } from 'react'
import { mongo } from '../../index'
import { ObjectId } from 'bson'
import ReactPlayer from 'react-player'
import { Onecomentario } from '../tereUI/Comentario'
import { Link } from 'react-router-dom'




export class BotonLeerCuento extends Component {
    state = {
        cuento: {}
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
                <LeerCuento cuento {...this.state.cuento} />
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
                            {/* le paso las props  */}
                            <img src={this.props.imagen} alt="No disponible" width="550px" />
                        </div>
                        <div className="div-leercuento" >
                            <h1 className="div-leercuento" >{this.props.titulo}</h1>
                            <p className="card-text">{this.props.argumento}</p>
                            <ReactPlayer width="700px" height="500px" url={this.props.video} className="div-leercuento" />
                        </div>
                        <div className="modal-footer">
                            <h4><small className="text-muted">{this.props.moraleja}</small></h4>
                        </div>
                    </div>
                </div>

                {/* // creo los inputs de los comentarios */}

                <div className="container">
                    <h2>Comentarios</h2>
                    <p>Déjanos tu opinión</p>

                    <div className="form-group">
                        <textarea onChange={(e) => {
                            this.setState({ comentario: e.target.value })
                        }} className="form-control" rows="5" id="comment" name="text"></textarea>
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

                </div>
            </div>



        )
    }



}