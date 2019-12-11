import React, { Component } from 'react'
import { stitch } from '../..'
import { mongo } from '../../index'


class DefAdiv{
  constructor() {
    this.texto = '';
    this.solucion = '';
    this.dificultad = '';
    this.comentarios = [];
    this.autor = stitch.auth.user.id;
  }
}

export class Adivinanzas extends Component {
  state = {
    value:'',
    adivinanzas: new DefAdiv(),
    
  }
  adivinanzas = mongo.db('miapp').collection('adivinanzas')

  rendertexto = () => {
    return <textarea
    value = {this.state.adivinanzas.texto}
    title = "Introduce el texto"
    className = "form-control"
    placeholder = "Texto"
    onChange = { (e) => {
      this.setState({ adivinanzas: { ...this.state.adivinanzas, texto: e.target.value}})
    }} />
  }
  rendersolucion = () => {
    return <input
    value = {this.state.adivinanzas.solucion}
    title = "Introduce el texto"
    className = "form-control"
    placeholder = "Solucion"
    onChange = { (e) => {
      this.setState({ adivinanzas: { ...this.state.adivinanzas, solucion: e.target.value}})
    }} />
  }
  renderdificultad = () => {
    return (
      <div>
    <input list="browsers"/>
          <datalist>
            <option value="Fácil"></option>
            <option value="Dificil"></option>
          </datalist>
          </div>
    )
  }
  renderautor = () => {
    return <input
    value = {this.state.adivinanzas.autor}
    title = "Introduce el autor"
    className = "form-control"
    onChange = { (e) => {
      this.setState({ adivinanzas: { ...this.state.adivinanzas, autor: e.target.value}})
    }} />
  }


  render() {
    return (
      <div id="#mimodal" className="modal2-content">
        <h3>Nueva adivinanza</h3>
        {this.rendertexto()}
        {this.rendersolucion()}
        {this.renderdificultad()}
        {this.renderautor()}
        <button onClick={e => {
            let a = this.state.adivinanzas
            delete a._id
            this.adivinanzas.insertOne(a)
            this.setState({ adivinanzas: new DefAdiv() })
          }}>Grabar</button>
        
      </div>
    )
  }
}


