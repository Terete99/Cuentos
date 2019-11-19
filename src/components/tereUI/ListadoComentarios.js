import React, { Component } from 'react'
import { mongo } from '../../index'
import { Link } from 'react-router-dom'
import { Menu } from '../userUI/Menu'

export class ListadoComentarios extends Component {
  state = {
    cuentosConComentarios: []
  }

  componentDidMount = () => {
    //parametro del id en url

    console.log(this.props.match.params.id)

    mongo.db('miapp').collection('cuentos')

      .find({ comentarios: { $exists: true, $not: { $size: 0 } } })
      .toArray()
      .then(cuentosConComentarios => {
        this.setState({ cuentosConComentarios: cuentosConComentarios } )

        console.log(cuentosConComentarios)
      })

  }

  render() {
    return (
      <div>
        <Menu></Menu>
        {this.state.cuentosConComentarios.map( (c, i)=>{
          return (
            <div key={i}>
              <Link to={`/gestionarcomentarios/${c._id}`}>
                <h2> {c.titulo}</h2>
              </Link>
            </div>
          )
        })}
    </div>
    )
  }
}
