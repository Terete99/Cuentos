import React, { Component } from 'react'
import { ObjectId } from 'bson'
import { mongo } from '../../index'

//este componente es para que yo apruebe y gestione los comentarios



export class GestionarComentarios extends Component {
  state = {
    cuento: {} // new CuentoComponent()
  }
  componentDidMount = () => {
    //parametro del id en url

    console.log(this.props.match.params.id)
    mongo.db('miapp').collection('cuentos')
      //conv id a string/ el findOne solo recibe una condicioón
      .findOne({ _id: new ObjectId(this.props.match.params.id) })
      .then(cuento => {
        this.setState({ cuento: cuento });

        console.log(cuento)
      })


    //traer comentarios
  }
  render() {

    return (
      <div>
        {this.state.cuento.comentarios.map((c, i) => { 
          return <div  key={i}> 
          <h4>{this.props.texto}</h4><br></br>
        <p onClick={e => {
          let copia = this.state.cuento.comentario
          }} /> Eliminar

          </div> })}
        
      {JSON.stringify(this.state.cuento)}
      </div>
    )
  }
}
