import React, { Component } from 'react'
import { Menu } from '../userUI/Menu'

export class Onecomentario{
    constructor(){
        this.texto= ''
        this.estado= false
    }
}

export class Comentario extends Component {
    state = {
        cuento: { comentarios: [] }
    }

    render() {

         
        return (
            <div>
                {this.state.cuento.comentarios.map( (c, i) => { return <ShowComentario key={i} {...c}></ShowComentario>
                } )}
            </div>
        )
    }
}
class ShowComentario extends Component{
    render() { 
        return(
        <div>
            <Menu {...this.props} ></Menu>
            <h2> {this.props.titulo} </h2>
            <p>{this.props.texto} </p>
            {this.props.estado}
      </div>
    )
    }
}