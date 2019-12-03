import React, { Component } from 'react'
import { mongo } from '../index'


class Factura {
  numero = 0;
  fecha = '';
  productos = [];
  cliente = {};

  
  static listado(){
    return mongo.db('test').collection('facturasCompleta')
    .aggregate([]).toArray()
  }  

}

class Cliente {
  nombre = '';
  apellidos = '';
  direccion = '';
  nif = '';

  static listado(){
    return mongo.db('test').collection('clientes')
    .aggregate([]).toArray()
  } 
}

class Producto {
  nombre = '';
  precio = 0;
  stock = 0;

  static listado(){
    return mongo.db('test').collection('productos')
    .aggregate([]).toArray()
  }

}

export class Test extends Component {
  state = { 
    productos: [], // todos los de la colecciÃ³n para el select
    factura: new Factura(), // la factura a enviar a Mongo
    productoSeleccionado: {},  // el producto que hay en el select
    clientes: [],
    clienteSeleccionado: {}
  }

  componentDidMount(){
    // necesitamos una factura - OK
    // llenar un select de productos
    Producto.listado().then(d => {
      this.setState({ productos: d })
    })
    // llenar un select de clientes
    Cliente.listado().then(d => {
      this.setState({ clientes: d })
    })
    // pintar inputs para la factura

  }

  selectorProductos = () => {
    return (
      <div>
        <select onChange={ e => {
          console.log(e.target.value);
          console.log(this.state.productos[e.target.value])
          this.setState({ productoSeleccionado: this.state.productos[e.target.value]})
          
        }}>
          { this.state.productos.map( (p, i) => {
            return <option key={i} value={i}> {p.nombre} </option>
          }) }
        </select>
        <button onClick={e => {
          let copia = this.state.factura.productos;
          copia.push(this.state.productoSeleccionado);
          this.setState({ 
            factura: { ...this.state.factura, productos: copia} 
          })

          // buscar en Mongo y aÃ±adir a la factura
        }}> añadir producto a la factura </button>
      </div>
      
    )
  }

  selectorClientes = () =>{
    return (
    <div>
      <select onChange={ e => { 
        console.log(e.target.value) 
        this.setState({clienteSeleccionado: this.state.clientes[e.target.value]})
        }}>
      {this.state.clientes.map( (c, i) => {
       return <option key={i}>{c.nombre} {c.apellidos}</option>
      })}
      </select>
      <button onClick={ e => {
       this.setState({
         factura: {...this.state.factura, cliente: this.state.clienteSeleccionado}
       }) //añadir este cliente a la factura
      //  this.state.factura.cliente = this.state.clienteSeleccionado
      }}>Seleccionar cliente</button>
    </div>
    )
  }

  render() {   
   
    return (
      <div style={{ padding: 20 }}>

      {this.selectorProductos()}
      {this.selectorClientes()}

      <pre> {JSON.stringify(this.state, undefined, 2)} </pre>
      </div> 
    )
  }
}
