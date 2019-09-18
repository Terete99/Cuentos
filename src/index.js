import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import {Home} from './components/GestionProductos'
import {BrowserRouter, Route} from 'react-router-dom'

import {Cuento} from './components/Cuento'

export const ajaxGet = (url, cb) => {
    fetch( url, {
    method: 'GET',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    // body: JSON.stringify(this.state)
    })
    .then( res => { return res.json() })
    .then( data => { cb(data) } )
    // devuelve Promise, dejamos el último then() para que lo haga el Component
}
    
export const ajaxPost = (url, cb) => {
    fetch( url, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    // body: JSON.stringify(this.state)
    })
    .then( res => { return res.json() })
    .then( data => { cb(data) } )
}



const rutas =(
    <BrowserRouter>
    <Route path="/cuento" component={Cuento} />
    </BrowserRouter>
)


ReactDOM.render(rutas, document.getElementById('root'))