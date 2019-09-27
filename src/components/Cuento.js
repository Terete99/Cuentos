import React, { Component } from 'react'
import {mongo} from '../index'
import{ ObjectId } from 'bson'
import '../index.css'

export class Onecomentario{
    constructor(){
        this.texto= ''
        this.estado= false
    }
}

class CuentoComponent{
    constructor( ){
        this.titulo = ''
        this.argumento = ''
        this.imagen = ''
        this.moraleja = ''
        this.video = ''
        this.comentarios= []
        
    }
}
export class Cuento extends Component {
    state = {
        value:'',
        cuento: new CuentoComponent(),
        texto: '',
        ocultarPreview: true,
        upsertedId: ''
    }
    
    cuentos = mongo.db('miapp').collection('cuentos')

    rendertitulo = () => {
        return <input
        value={this.state.cuento.titulo}
        title="Introduce el título"
        className="form-control"
        placeholder="Título"
        onChange = {(event) => {this.setState ({ cuento: {...this.state.cuento, titulo: event.target.value}}) }} /> 
    }
    renderargumento = () =>{
        return <textarea
        value={this.state.cuento.argumento}
        title="Introduce el argumento"
        className="form-control" 
        placeholder="Argumento"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, argumento: c.target.value}}) }} />
    }
    renderimagen = () =>{
        return <input
        value={this.state.cuento.imagen}
        title="Introduce la imagen"
        className="form-control"
        placeholder="Imagen"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, imagen: c.target.value}}) }} /> 
    }

    
    rendermoraleja = () =>{
        return <input
        value={this.state.cuento.moraleja}
        title="Introduce la moraleja"
        className="form-control"
        placeholder="Moraleja"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, moraleja: c.target.value}}) }} /> 
    }
    rendervideo = () =>{
        return <input
        value={this.state.cuento.video}
        title="Introduce el video"
        className="form-control"
        placeholder="Video"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, video: c.target.value}}) }} /> 
    }

    ///////////////////
    rendertexto = () =>{
        return <input
        // value={this.state.cuento.comentario}
        title="Introduce el comentario"
        className="form-control"
        placeholder="Comentario"
        onChange = {(c) => {this.setState({ texto: c.target.value }) }} /> 
    }

    grabar = () => {
        this.cuentos.insertOne(this.state.cuento)
        
    }
    // grabar = () =>{ 
    //     fetch('http://localhost:3000/tere/cuentos', {
    //         method:'POST',
    //         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //         body: JSON.stringify(this.state.cuento)
    //     }).then( respuesta=> { respuesta.json().then( json => {
    //         this.setState({upsertedId: json.upsertedId._id})
    //         setTimeout( () => {
    //             this.setState({upsertedId: ''})
    //         }, 1000)
            
    //     })} )
    // }


    componentDidMount() {
        //pasarle el parámetro del id en la url para edición
        if (this.props.match.params.id === 'nuevo'){}
        else {console.log(this.props.match.params.id)
        mongo.db('miapp').collection('cuentos')
        //convertimos el id a string con el método ObjectId y lo importamos
        .findOne({_id: new ObjectId(this.props.match.params.id)})
        .then( cuento => {this.setState({cuento: cuento  }) })
        }
        // this.colecc.insertMany(cuentos).then(r => console.log(r))
        this.cuentos.find().toArray().then( c => console.log(c) )
        window.onclick = (event) => {
            if (event.target === document.getElementById('mimodal')) {
                document.getElementById('mimodal').style.display = 'none'
            }
        }
    }

    render() {

        return (
            <div className="modal2-content">

                {/* <button onClick={e => document.getElementById('mimodal').style = 'display: block'}> Crear cuento </button>
                <div id="mimodal" className="modal2">
                            </div> */}


                        {this.rendertitulo()}
                        {this.renderargumento()}
                        {this.renderimagen()}
                        {this.rendermoraleja()}
                        {this.rendervideo()}
                        {this.rendertexto()}
                        {/* boton comentar */}
                        
                        <button onClick={ e => {
                        // crear un objeto con la estructura de Onecomentario
                        let Nuevocomentario = new Onecomentario()
                        // meter el valor del input en Nuevocomentario.texto
                        Nuevocomentario.texto = this.state.texto
                        // this.state.cuento.comentarios.push(Onecomentario)
                        // hacer copia del array del state:
                        let copia = this.state.cuento.comentarios || []
                        copia.push(Nuevocomentario)
                        console.log(copia)
                        this.setState({ cuento: {...this.state.cuento, comentarios: copia } })
                        console.log(this.state.cuento)

                        }}> comentar </button>
                        






                        <button onClick={ e => {
                            let c = this.state.cuento
                            delete c._id
                            this.cuentos.insertOne(c)
                        }}>Grabar</button>
                        <button onClick={e => {
                           this.cuentos.findOneAndReplace({_id:new ObjectId(this.props.match.params.id)}, this.state.cuento)
                        }}>Modificar</button>

                        <button onClick={e => {
                           this.cuentos.deleteOne({_id:new ObjectId(this.props.match.params.id)})
                        }}>Borrar</button>

                        {/* <pre>
                    {JSON.stringify(this.state)}

                    </pre> */}
                    {/* </div>
                </div> */}

             </div>
        )

    }
}
