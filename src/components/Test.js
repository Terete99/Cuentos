import React, { Component } from 'react'
import { mongo } from '../index'


export class Nave {

  constructor( nombre, peso){
    // USO: new Nave('Halcón Milenario', 10500)
    this.nombre = nombre ? nombre : 'Cuidado Nave Pirata';
    this.pesoMaximo = peso ? peso : 0 ; // peso sin Aliens
    this.ocupantes = [];          // los ocupantes siempre son Aliens
    this.posicion = { x: 0, y: 0, z: 0 } // 
  }

  embarca(alien){
    let cabe = this.cuantoPesas() + alien.peso <= this.pesoMaximo
    if ( cabe ) { 
      this.ocupantes.push(alien); 
      return true;
    } else { return false }
  }

  saveToDb(){
   return mongo.db('aborrar').collection('naves').insertOne(this);
  }

  cuantoPesas(){
    let total = 0;
    this.ocupantes.forEach( alien => { 
      total += alien.peso
    });
    return total;
  }

  static pesoPorNave(sort){
    return mongo.db('aborrar').collection('naves')
    .aggregate([
      { $unwind: "$ocupantes" },
      { $group: { 
        _id: "$nombre", 
        ocupantes: { $sum: 1 },
        peso: { $sum: "$ocupantes.peso" },
        mediaPesos: { $avg: "$ocupantes.peso" }
      }},
      { $sort: sort ? sort : { peso: -1 } }
    ])
    .toArray() 
  }

  static listado(){
    return mongo.db('aborrar').collection('naves')
    .aggregate([])
    .toArray()
  }

}

// class Alien {
//   constructor(nombre, peso){
//     this.nombre = nombre ? nombre : 'Alien desconocido' ;
//     this.peso = peso ? peso : 0 ;
//   }
// }

export class Test extends Component {
// probando el método de clase Nave.listado()
  state = { naves: [], ordenNombre: 1, ordenPeso: -1, ordenOcupantes: -1  }

  componentDidMount() {   
    Nave.pesoPorNave().then( naves => { 
      this.setState({naves: naves})
    }); 
  }

  render() {   
    return (
      <div style={{ padding: 20 }}>
        <div className="row"> 
          <div
            onClick={ e => {
              Nave.pesoPorNave({ _id: this.state.ordenNombre })
              .then( naves => { 
                this.setState({
                  naves: naves,
                  ordenNombre: this.state.ordenNombre === 1 ? -1 : 1
                })
              }); 
            }} 
            className="col manita">  Nave  </div>
          <div
            onClick={ e => {
              Nave.pesoPorNave({ peso: this.state.ordenPeso }).then( naves => { 
                this.setState({
                  naves: naves,
                  ordenPeso: this.state.ordenPeso === 1 ? -1 : 1
                })
              }); 
            }} 
            className="col manita"> Peso </div>
          <div
            onClick={ e => {
              Nave.pesoPorNave({ ocupantes: this.state.ordenOcupantes }).then( naves => { 
                this.setState({
                  naves: naves,
                  ordenOcupantes: this.state.ordenOcupantes === 1 ? -1 : 1
                })
              });
            }} 
            className="col manita"> tripulantes </div>
        </div>

      {this.state.naves.map( (nave, i) => (
        <div key={i} className="row"> 
          <div className="col"> {nave._id} </div>
          <div className="col"> {nave.peso} </div>
          <div className="col"> {nave.ocupantes} </div>

        </div>
      ))}
      </div> 
    )
  }
}

