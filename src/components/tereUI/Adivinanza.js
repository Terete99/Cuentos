import React, { Component } from 'react'
import { mongo, stitch } from '../../index'
import { Link } from 'react-router-dom'
import { ObjectId } from 'bson'
import Navbar from 'react-bootstrap/Navbar'

class DefAdiv {
  constructor() {
    this.texto = '';
    this.solucion = '';
    this.dificultad = '';
    this.comentarios = [];
    this.autor = stitch.auth.user.id;
  }

  //(this) es esta adivinanza
  insertOne() {
    return mongo.db("miapp").collection("adivinanzas").insertOne(this)
  }

  //Función que modifica el id que viene de mongo por el nuevo state
  findOneAndReplace() {
    return mongo.db("miapp").collection("adivinanzas").findOneAndReplace({ _id: this._id }, this)
  }

  //para eliminar hay que pasarle el id
  deleteOne() {
    return mongo.db("miapp").collection("adivinanzas").deleteOne({ _id: this._id })
  }

  //es una clase estática porque no necesita de un objeto para crearse
  static listado() {
    return mongo.db("miapp").collection("adivinanzas")
      .aggregate([
        { $sort: { texto: 1 } }
      ])
      .toArray()
  }
}

export class Adivinanza extends Component {
  state = {
    value: '',
    adivinanza: new DefAdiv(),
    adivinanzas: []

  }

  listarTodas = () => {
    DefAdiv.listado()
      .then(d => {
        this.setState({ adivinanzas: d })
        console.log(d)
      })
  }

  componentDidMount = () => {
    this.listarTodas();

  }

  adivinanzas = mongo.db('miapp').collection('adivinanzas')

  rendertexto = () => {
    return <textarea
      value={this.state.adivinanza.texto}
      title="Introduce el texto"
      className="form-control"
      placeholder="Texto"
      onChange={(e) => {
        // object.assign es para que adivinanza no pierda no herencia
        this.setState({ adivinanza: Object.assign(new DefAdiv(), { ...this.state.adivinanza, texto: e.target.value }) })

      }} />
  }
  rendersolucion = () => {
    return <input
      value={this.state.adivinanza.solucion}
      title="Introduce el texto"
      className="form-control"
      placeholder="Solucion"
      onChange={(e) => {
        this.setState({ adivinanza: Object.assign(new DefAdiv(), { ...this.state.adivinanza, solucion: e.target.value }) })
      }} />
  }
  renderdificultad = () => {
    return <input
      value={this.state.adivinanza.dificultad}
      title="Introduce la dificultad"
      className="form-control"
      placeholder="Dificultad"
      onChange={(e) => {
        this.setState({ adivinanza: Object.assign(new DefAdiv(), { ...this.state.adivinanza, dificultad: e.target.value }) })
      }} />
  }
  renderautor = () => {
    return <input
      value={this.state.adivinanza.autor}
      title="Introduce el autor"
      className="form-control"
      onChange={(e) => {
        this.setState({ adivinanza: Object.assign(new DefAdiv(), { ...this.state.adivinanza, autor: e.target.value }) })
      }} />
  }


  render() {
    return (

      <div className="container">
        <div id="#mimodal" className="modal2-content">

          <h3>Nueva adivinanza</h3>
          {this.rendertexto()}
          {this.rendersolucion()}
          {this.renderdificultad()}
          {this.renderautor()}
          <button onClick={e => {
            this.state.adivinanza.insertOne().then(resp => {
              console.log(resp);
              this.listarTodas();

            })
            this.setState({ adivinanza: new DefAdiv() })
          }}>Grabar</button>
          <button onClick={e => {
            this.state.adivinanza.findOneAndReplace()
              .then(respuesta => {
                console.log(respuesta);
                //despues de grabar llamo a oa función listado para actualizar los datos, a asi despues de cada funcion
                this.listarTodas();
              });

            this.setState({ adivinanza: new DefAdiv() })
          }}>Modificar</button>

          <button onClick={e => {
            this.state.adivinanza.deleteOne()
              .then(respuesta => {
                console.log(respuesta);
                this.listarTodas();
              });

            this.setState({ adivinanza: new DefAdiv() })
          }}>Eliminar</button>



          <pre> {JSON.stringify(this.state.adivinanza, undefined, 2)} </pre>

        </div>
        {this.state.adivinanzas.map((adivinanza, i) => {
          return (
            //hace click en casa li, no pierde herencia 
            <div key={i} onClick={e => {
              this.setState({ adivinanza: Object.assign(new DefAdiv(), adivinanza) });
            }}>
              <li>{adivinanza.texto}</li>
            </div>
          )
        })}

      </div>
    )
  }
}

export class ListadoAdivinanza extends Component {
  state = {
    adivinanzas: []
  }
  //lista el listado de adivinanzas user
  componentDidMount() {
    DefAdiv.listado().then(d => {
      this.setState({ adivinanzas: d })
      console.log(d)
    })
  }
  render() {
    return (
      //selectiona adivinanza user para adivinar
      <div className="centrar">
        <h1 style={{ textAlign: "center", padding: "50px" }}>Si crees que la adivinanza puedes acertar, no dudes en Adivinar</h1>
        {this.state.adivinanzas.map((adivinanza, i) => {
          return <div key={i} className="divAdivina">
            <h4>{adivinanza.texto}</h4>
            <Navbar.Brand><Link to={`/adivinanzauser/${adivinanza._id}`}>Adivinar</Link></Navbar.Brand>
          </div>
        })}
      </div>
    )
  }
}

export class Adivina extends Component {
  state = {
    adivinanza: new DefAdiv(),
    solucion: '',

  }
  componentDidMount() {
    mongo.db('miapp').collection('adivinanzas')
      //convertimos el id a string con el método ObjectId y lo importamos
      .findOne({ _id: new ObjectId(this.props.match.params.id) })
      .then(adivinanza => { this.setState({ adivinanza: adivinanza }) })

  }


  render() {
    let letras = this.state.adivinanza.solucion.split('');
    return (
      <div className="centrar divAdivina">
        <h3>Escribe la solución:</h3>
        <input
          size="20"
          value={this.state.solucion}
          onChange={e => this.setState({ solucion: e.target.value })}
          className="divAdivina" />
        <div>
          <i className="material-icons">
            sentiment_very_satisfied
        </i>
        </div>
        <br></br>
        <div className="form-inline">
          {letras.map((letra, i) => <Letra className="form-inlines" key={i} letra={letra} />)}
        </div>
      </div>
    )
  }

}

class Letra extends React.Component {
  state = { letra: this.props.letra }
  render() {
    return (
      <input
        className="form-control divAdivina"
        size="1"
        type="password"
        style={{ fontSize: "20px" }}
        value={this.state.letra}
        onChange={(e) => {
          this.setState({ letra: e.target.value })
        }}
        onClick={(e) => {
          e.target.type = "text"
        }}
      />
    )
  }
}


