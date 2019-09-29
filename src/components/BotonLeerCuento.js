import React, { Component } from 'react'
import { mongo } from '../index'
import { ObjectId } from 'bson'
import ReactPlayer from 'react-player'


export class BotonLeerCuento extends Component {
    state = {
        cuento: {}


    }

    componentDidMount = () => { //traer listado cuentos

        this.cuento.findOne({ _id: new ObjectId(this.props.match.params.id) }).then(c => {
           
            this.setState({ cuento: c})
            console.log(c)
            
        })
    }

    cuento = mongo.db('miapp').collection('cuentos')
    
    render() {
        
        return (
            <div>
              <LeerCuento cuento {...this.state.cuento} />
               {/* {JSON.stringify(this.state.cuento)} */}
               
            </div>
        )
    }
}

class LeerCuento extends Component {
    render() {
        return (

            

                <div className="card mb-3" className="div-leercuento">
                    <h1 className="card-title">{this.props.titulo}</h1>
                    <img src={this.props.imagen} alt="Card image cap" width="200px"/>
                    <div className="card-body">
                    <p className="card-text">{this.props.argumento}</p>
                    <ReactPlayer width="50" height="50" url={this.props.video} />
                    </div>
                    <h4 className="card-text"><small className="text-muted">{this.props.moraleja}</small></h4>
                     
                    </div>

            

        )
    }
}