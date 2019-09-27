import React, { Component } from 'react'

export class Onecomentario{
    constructor(){
        this.texto= ''
        this.estado= false
    }
}

export class Comentario extends Component {
    state = {}

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
            {this.props.texto} {this.props.estado}
      </div>
    )
    }
}