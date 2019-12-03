import React, { Component, useState } from 'react'
import { mongo } from '../index'



class Menu extends Component {
  render(){
    return (
      <div> <button onClick={e => {this.props.history.push('/game1')}}> click primero </button> </div>
    )
  }
}


export class Test extends Component {
  state = { nombre: '', apellidos: '', total: 0}

  changeInput = e => {
    if ( e.target.type === 'number'){
      this.setState({ [e.target.name]: parseFloat(e.target.value) }) 
    }
    else {
      this.setState({ [e.target.name]: e.target.value}) 
    }
  }

  render() {
    return (
      <div>

        <form onSubmit={ e => {
          e.preventDefault();          
        }}>
          <input name="nombre" onChange={this.changeInput} />
          <input name="apellidos" onChange={this.changeInput}  />
          <input name="total" type="number" onChange={this.changeInput} />
          <input type="submit" />
        </form>

{JSON.stringify(this.state, null, 2)}


      </div>
    )
  }
}

