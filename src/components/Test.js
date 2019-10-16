import React, { Component } from 'react'
import { mongo } from '../index'

export class Test extends Component {
    state = { paises: [], paisActual: '', vinos:[] }
    collectionVinos= mongo.db('marlene').collection('vinos')

    componentDidMount() {
        // let agg = [
        //     { $group: { _id: '$country', total: { $sum: 1 } } },
        //     //ordenamos ascendente/ ponemos -1 para que sea descendente
        //     { $sort: { _id: 1 } }
        // ]        
    }

    changeSelectPaises = (e) => {
        this.setState({ paisActual:e.target.value}, () => {
            this.collectionVinos.aggregate([
                {$match: { country: this.state.paisActual}},
                {$sort: { price: -1}}
            ]).toArray()
            .then( (data) => {this.setState({ vinos: data })})
        })
    }
    render() {

        return (
            <div>
                {/* capturamos el valor del input */}
                <select onChange={ this.changeSelectPaises}>
                    {/* cuando ponemos value a un option hay que decirle lo que queremos sacar */}
                    {this.state.paises.map((pais, i) => <option key={i} value={pais._id}> {pais._id} {pais.total}</option>)}
                </select>
                <pre> {JSON.stringfy(this.state.paisActual, undefined, 2)}</pre>

            </div>
        )
    }
}
