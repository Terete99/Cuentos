import React, { Component } from 'react'
import { mongo } from '../index'
import { Link } from 'react-router-dom'
import { ObjectId } from 'bson'

const db = 'miapp', coll = 'blog'

class Entrada {

  titulo = '';
  seccion = '';
  texto = '';
  ediciones = 0;
  fecha = new Date().toISOString().split('T')[0];

  static findOne(x) {
    return mongo.db(db).collection(coll).findOne({ _id: new ObjectId(x) })

  }


  insertOne() {
    return mongo.db(db).collection(coll).insertOne(this)
  }
  static listado() {//metodo de instancia que devuelve un promise
    return mongo.db(db).collection(coll).aggregate([]).toArray()
  }


  findOneAndReplace() {
    return mongo.db(db).collection(coll).findOneAndReplace(
      { _id: new ObjectId(this._id) },
      this
    )
  }

}

export class FormularioEntradas extends Component {
  state = {
    entrada: new Entrada(),
    hideBotonInsert: true,
    hideBotonModificar: true,
  }


  componentDidMount() {
    if (this.props.match.params.id.length === 24) {
      Entrada.findOne(this.props.match.params.id)
        .then(e => this.setState({ //te va areflejar como queda el state
          entrada: Object.assign(new Entrada(), e),
          hideBotonModificar: false

        }))
    } else {
      this.setState({ hideBotonInsert: false })
    }
  }

  changeInput = e => {
    this.setState({
      entrada: Object.assign(
        new Entrada(), { ...this.state.entrada, [e.target.name]: e.target.value })
    })
  }
  renderInputTitulo = n => {
    return (
      <input
        name="titulo"
        value={this.state.entrada.titulo}
        className="form-control"
        placeholder="Titulo de la entrada"
        onChange={this.changeInput}
      />
    )
  }
  renderInputSeccion = n => {
    return (
      <input
        name="seccion"
        value={this.state.entrada.seccion}
        className="form-control"
        placeholder="Seccion de la entrada"
        onChange={this.changeInput}
      />
    )
  }
  renderInputTexto = n => {
    return (
      <textarea
        name="texto"
        value={this.state.entrada.texto}
        rows="20"
        className="form-control"
        placeholder="Texto de la entrada"
        onChange={this.changeInput}
      />
    )
  }
  renderInputFecha = n => {
    return (
      <input
        type="date"
        name="fecha"
        value={this.state.entrada.fecha}
        className="form-control"
        placeholder="Fecha de la entrada"
        onChange={this.changeInput}
      />
    )
  }
  renderBotonInsertar = n => {
    return (
      <button onClick={e => {
        this.state.entrada.insertOne().then(resp => {
          this.setState({ hideBotonInsert: true, hideBotonModificar: false })
          this.props.history.push(`/editar/${resp.insertId}`)

        })
      }}
        hidden={this.state.hideBotonInsert}

      >Insertar</button>
    )
  }
  renderBotonModificar = n => {
    return <button onClick={e => {
      this.state.entrada.findOneAndReplace().then(resp => console.log(resp))
    }}
      hidden={this.state.hideBotonModificar}
    >Modificar</button>

  }



  render() {
    return (
      <div className="container">
        {this.renderInputTitulo()}
        {this.renderInputSeccion()}
        {this.renderInputFecha()}
        {this.renderInputTexto()}
        {this.renderBotonInsertar()}
        {this.renderBotonModificar()}

        < pre > {JSON.stringify(this.state, null, 2)} </pre>

      </div>
    )
  }
}

export class ListadoEntradas extends Component {
  state = { entradas: [] }

  componentDidMount() {
    //leer la coleccion completa y guardarla en el state
    Entrada.listado().then(d => this.setState({ entradas: d }))

  }
  render() {
    return (
      <div>
        <Link to="./blog2">Listado</Link><br></br>
        <Link to="./blog/nuevo">Anadir entrada</Link>
        <br></br>
        {this.state.entradas.map(
          (entrada, i) => <ShowEntrada key={i} {...entrada} />
        )}
      </div>
    )
  }

}

export class ShowEntrada extends Component {
  render() {
    return (
      <div>
        <Link to={`/blog/${this.props._id}`}> {this.props.titulo} </Link>

      </div>
    )
  }
}





