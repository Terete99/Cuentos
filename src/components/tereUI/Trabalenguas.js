import React, { Component } from 'react'
import { mongo } from '../../index'


export class TrabalenguasComponent {
  constructor(){
    this.texto=''
    this.temática=[]
  }
}

export class Trabalenguas extends Component {
  state = {
    value: '',
    trabalenguas: new TrabalenguasComponent(),
    texto: '',
 
  }
  trabalenguas = mongo.db('miapp').collection('trabalenguas')

  

  

  rendertexto = () => {
    return <textarea
        value={this.state.trabalenguas.texto}
        title="Introduce el texto"
        className="form-control"
        placeholder="Texto"
        onChange={(e) => { this.setState({ trabalenguas: { ...this.state.trabalenguas, texto: e.target.value } }) }} />
}

rendertematica = () => {
  return <input
  value= {this.state.trabalenguas.tematica}
  title= "Introduce una temática"
  className= "form-control"
  placeholder="Temática"
  onChange= {(e) => { this.setState({ trabalenguas: {...this.state.trabalenguas, tematica: e.target.value } }) }} />
}

grabar = () => {
  this.trabalenguas.insertOne(this.state.trabalenguas)
}
componentDidMount = () => {
  //  mongo.db('miapp').collection('trabalenguas')
   this.trabalenguas.find().toArray().then(t =>{
    this.setState({ trabalenguas: t })
    console.log(t)
  })
}
  render() {
    return (
      <div id="#mimodal" className="modal2-content">
        {this.rendertexto()}
        {this.rendertematica()}

        <button onClick={e => {
                    let t = this.state.trabalenguas
                    delete t._id
                    this.trabalenguas.insertOne(t)
                    this.setState({ trabalenguas: new TrabalenguasComponent() })
                }}>Grabar</button>
      </div>
    )
  }
}


