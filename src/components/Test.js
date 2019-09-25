class Cuento {
    constructor(){
    this.titulo = '',
    this.comentarios = []
    }
    }
    
    class ComentarioCuento {
    constructor(){
    this.texto = ''
    this.estado = false
    }
    }
    
    export class Test extends Component {
    state = {
    cuento: { titulo: 'Caperucita', comentarios: [] } ,
    texto: ''
    }
    
    render() {
    return (
    <div>
    <input
    // controla el texto de 1 comentario nuevo
    value={}
    onChange={ e => this.setState({ texto: e.target.value}) } />
    
    <button onClick={ e => {
    // crear un objeto con la estructura de ComentarioCuento
    let nuevoComentario = new ComentarioCuento()
    // meter el valor del input en nuevoComentario.texto
    nuevoComentario.texto = this.state.texto
    // this.state.cuento.comentarios.push(nuevoComentario)
    // hacer copia del array del state:
    let copia = this.state.cuento.comentarios
    copia.push(nuevoComentario)
    this.setState({ cuento: {...this.state.cuento, comentarios: copia } })
    
    
    }}> comentar </button>
    </div>
    )
    }
    }
    