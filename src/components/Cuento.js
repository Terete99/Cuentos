import React, { Component } from 'react'
import '../index.css'
class CuentoComponent{
    constructor( ){
        this.titulo = ''
        this.argumento = ''
        this.imagen = ''
        this._id = ''
        this.moraleja = ''
    }
}



export class Cuento extends Component {
    state = {
        cuento: new CuentoComponent(),
        ocultarPreview: true,
        upsertedId: ''
    }
    rendertitulo = () => {
        return <input
        title="Introduce el título"
        className="form-control"
        placeholder="Título"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, titulo: c.target.value}}) }} /> 
    }
    renderargumento = () =>{
        return <textarea
        title="Introduce el argumento"
        className="form-control"
        placeholder="Argumento"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, argumento: c.target.value}}) }} />
    }
    renderimagen = () =>{
        return <input
        title="Introduce la imagen"
        className="form-control"
        placeholder="Imagen"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, imagen: c.target.value}}) }} /> 
    }

    renderid = () =>{
        return <input 
        type= "hidden"
        className="form-control"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, _id: c.target.value}}) }} /> 
    }
    rendermoraleja = () =>{
        return <input
        title="Introduce la moraleja"
        className="form-control"
        placeholder="Moraleja"
        onChange = {(c) => {this.setState ({ cuento: {...this.state.cuento, moraleja: c.target.value}}) }} /> 
    }
    grabar = () =>{ 
        fetch('http://localhost:3000/tere/cuentos', {
            method:'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.cuento)
        }).then( respuesta=> { respuesta.json().then( json => {
            this.setState({upsertedId: json.upsertedId._id})
            setTimeout( () => {
                this.setState({upsertedId: ''})
            }, 1000)
            
        })} )
    }


componentDidMount(){
    window.onclick=(event) => {
    if (event.target === document.getElementById('mimodal')) {
    document.getElementById('mimodal').style.display='none'
    }
    }}
    render() {
        
        return (
            <div>

                <button onClick={e => document.getElementById('mimodal').style = 'display: block'}> Crear cuento </button>
                <div id="mimodal" className="modal2">
                <div className="modal2-content">
                <div hidden={this.state.ocultarPreview}>
                hola

            </div>
            
               
                {this.rendertitulo()}
                {this.renderargumento()}
                {this.renderimagen()}
                {this.renderid()}
                {this.rendermoraleja()}
               
                
                <button onClick={this.grabar}>Grabar</button>
                <button onClick={ e => { 
                    this.setState({ocultarPreview: !this.state.ocultarPreview})
                }}>Mostrar</button>
                <i class="material-icons" hidden={this.state.upsertedId ===''}>
                    done_all
                    </i>

                    <pre>
                    {JSON.stringify(this.state)}

                    </pre>
                    </div>
            </div>
           
            </div>
        )
       
    }
}
