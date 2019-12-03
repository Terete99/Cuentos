import React, { Component } from 'react'
import { ObjectId } from 'bson'
import { mongo } from '../../index'
import { CuentoComponent } from './Cuento'
import { Menu } from '../userUI/Menu'

//este componente es para que yo apruebe y gestione los comentarios



export class GestionarComentarios extends Component {
  state = {
    cuento: new CuentoComponent()
  }

  coleccion = mongo.db('miapp').collection('cuentos')
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
        <Menu {...this.props} ></Menu>
        {this.state.cuento.comentarios.map((c, i) => {

          return <div key={i}>
            <h4>{c.texto}</h4><br />
            {/* oculto comentario cuando el estaso es false */}
            <span hidden={this.state.cuento.comentarios[i].estado === false}> Publicado </span>

            <span onClick={(e) => {
              // creo copia porque no podemos machacar directamente el contenido del state
              let copia = this.state.cuento.comentarios
              copia.splice(i, 1)
              this.setState({
                cuento: { ...this.state.cuento, comentarios: copia }
              })
            }}>  Eliminar </span>
            
            <span onClick={(e) => {
              let copia = this.state.cuento.comentarios
              //  cuando le metemos a la copia el [i] buscamos modificarlo
              copia[i].estado = !copia[i].estado
              this.setState({
                cuento: { ...this.state.cuento, comentarios: copia }
              })
            }}>  Publicar </span>
            <hr />
          </div>
        })}
        <button onClick={(e) => {
          mongo.db('miapp').collection('cuentos')
          .findOneAndReplace({ _id: new ObjectId(this.props.match.params.id) }, this.state.cuento)
          // this.setState({... this.state.cuento})
        }}>Grabar
  
        </button>
        <hr></hr>

        {JSON.stringify(this.state.cuento)}
      </div>
    )

  }
}

export class GestionarComentariosCard extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}
