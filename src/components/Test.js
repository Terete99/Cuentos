import React, { Component } from 'react'

class Pedido {
    //el constructor es par decirle como crea objetos vacíos
    constructor() {
        this.fecha = ""
        this.productos = []
        this.recibido = false
    }

}

export class Test extends Component {
    //el state solo puede tocarse con el setState
    state = {
        //el new Pedido hereda todo lo que tenga Pedido
        pedido: new Pedido()
    }

    render() {

        return (
            <div>
                <input
                    type="date"
                    value={this.state.pedido.fecha}
                    placeholder="escribe tu email"
                    className="form-control"
                    onChange={(e) => {
                        //llevar al state el valor de este input
                        this.setState(
                            //siempre lleva dentro un objeto, mantenerbel objeto y mantener 2 atributos
                            { pedido: { ...this.state.pedido, fecha: e.target.value } }
                        )

                    }}

                />

                <input
                    type="checkbox"
                    checked ={this.state.pedido.recibido}
                    placeholder="escribe tu email"
                    onChange={(e) => {
                        //llevar al state el valor de este input
                        this.setState(
                            //siempre lleva dentro un objeto, cuando marco el tic sale true y cuando lo quito false
                            { pedido: { ...this.state.pedido, recibido: ! this.state.pedido.recibido} }
                        )

                    }}

                    />
                    {/* esto es para ver que lo estamos recibiendo bien */}
                    {JSON.stringify(this.state)}
            </div>
            )
        }
    }
