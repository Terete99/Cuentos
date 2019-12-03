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
  //vuelvo a hacer el agregate para cambiar el state de cada tema
  renderSelectTemas = () => {
    return (
      <select
      className="btn btn-primary"
        onChange={e => {
          this.trabalenguas.aggregate([
            { $match: { tematica: e.target.value } }
          ]).toArray().then(t => {
            this.setState({ trabalenguas: t })
            console.log(t)
          })
        }}>
        {this.state.tematicas.map((t, i) => <option key={i}> {t._id} </option>)}
      </select>
    )
  }
  render() {

    return (
      <div>
        <Menu {...this.props} ></Menu>
        <div className="fondo " >
          {this.renderSelectTemas()}
          {this.state.trabalenguas.map((t, i) => <div className="container" key={i}>

            <div className="card">
              <div className="card-body">{t.texto}</div>
            </div>

          </div>)}
        </div>
        {JSON.stringify(this.state, null, 2)}
      </div>


    )
  }
}
