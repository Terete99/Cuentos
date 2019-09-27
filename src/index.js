import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import {Home} from './components/GestionProductos'
import {BrowserRouter, Route} from 'react-router-dom'
import {Cuento} from './components/Cuento'
import {Stitch, RemoteMongoClient, AnonymousCredential} from "mongodb-stitch-browser-sdk";
import {Cuentos} from  './components/Cuentos'
import {Comentario} from './components/Comentario'
import {UserCuentos} from './components/UserCuentos'


export const stitch = Stitch.initializeAppClient('')
if (!stitch.auth.isLoggedIn){
    stitch.auth.loginWithCredential(new AnonymousCredential())
}
export const mongo = stitch.getServiceClient(RemoteMongoClient.factory,'mongodb-atlas')

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

    <Route exact path="/" component={UserCuentos} />
    <Route path="/cuento/:id" component={Cuento} />
    <Route path="/cuentos" component={Cuentos} />
    <Route path="/comentario" component={Comentario} />
    <Route path="/usercuentos" component={UserCuentos} />

    </BrowserRouter>
)


ReactDOM.render(rutas, document.getElementById('root'))