import React, { Component } from 'react'
import { mongo } from '../../index'
import Form from 'react-bootstrap/Form'



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

      <Form.Control as="select"
        style={{margin:"35px"}}
        size="lg"
        onChange={e => {
          this.trabalenguas.aggregate([
            { $match: { tematica: e.target.value } }
          ]).toArray().then(t => {
            this.setState({ trabalenguas: t })
            console.log(t)
          })
        }}>
        {this.state.tematicas.map((t, i) => {
          return (
            <option key={i}> {t._id} </option>)
        }

        )}
      </Form.Control>
      

    )
  }
  render() {

    return (
      <div className="fondo " >
        <h1 style={{textAlign:"center",padding:"15px"}}>Trabalenguas</h1>
        <div style={{padding:"15px"}}>

          <h4 style={{margin:"35px"}}>Selecciona la temática</h4>
        

          {this.renderSelectTemas()}
          {this.state.trabalenguas.map((t, i) => <div className="container" key={i}>

            <div className="card">
              <div className="card-body">
                <h3>{t.texto}</h3></div>
            </div>

          </div>)}
        </div>
      </div>


    )
  }
}
