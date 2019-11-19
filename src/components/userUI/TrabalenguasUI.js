import React, { Component } from 'react'
import { mongo } from '../../index'
import { Menu } from './Menu'


export class TrabalenguasUI extends Component {
  state = { trabalenguas: [], tematicas: [] }

  componentDidMount = () => {
    if (this.props.match.params.tema) {
      console.log('entra por if')
      this.trabalenguas.aggregate([
        { $match: { tematica: this.props.match.params.tema } }
      ]).toArray().then(t => {
        this.setState({ trabalenguas: t })
        console.log(t)
      })
    }
    else {
      console.log('entra por else')

      this.trabalenguas.find().toArray().then(t => {
        this.setState({ trabalenguas: t })
        console.log(t)
      })
    }
    //traer listado trabalenguas, pintar en cuanto se cargue la página

    this.trabalenguas.aggregate([
      { $group: { _id: "$tematica" } }
    ])
      .toArray().then(t => {
        this.setState({ tematicas: t })
        console.log(t)
      })
  }
  trabalenguas = mongo.db('miapp').collection('trabalenguas')
  render() {

    return (
      <div>
      <Menu></Menu>
      <div className="fondo">
        {this.state.trabalenguas.map((t, i) => <div className="container" key={i}>{i}

          <div className="card">
            <div className="card-body">{t.texto}</div>
          </div>

        </div>)}
      </div>
      </div>


    )
  }
}
