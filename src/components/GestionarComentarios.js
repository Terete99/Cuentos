import React, { Component } from 'react'
import { ObjectId } from 'bson'
import { mongo } from '../index'

//este componente es para que yo apruebe y gestione los comentarios



export class GestionarComentarios extends Component {
  state = {
    cuento: { comentarios: [] }
  }
  componentDidMount = () => {
    //parametro del id en url

    console.log(this.props.match.params.id)
    mongo.db('miapp').collection('cuentos')
      //conv id a string
      .findOne({ _id: new ObjectId(this.props.match.params.id) })
      .then(cuento => { 
        this.setState({ cuento: cuento } ); 
        console.log(cuento) 
      })


    //traer titulo y comentarios
  }
  render() {

    return (

      <div>
        
        {this.state.cuento.comentarios.map((c, i) => <CardGestionCom key={i} {...c} /> )}
        {JSON.stringify(this.state)}
      </div>
    )
  }
}

class CardGestionCom extends Component {
  render() {
    return (

      <div>
        <h2>{this.props.titulo}</h2>
        <h4>{this.props.texto}</h4>
        <input type="radio" name="gender" value={this.props.estado}/>Eliminar<br></br>
        <input type="radio" name="gender" value={this.props.estado}/>Publicar
      </div>
    )
  }
}