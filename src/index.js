import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import {Home} from './components/GestionProductos'
import {BrowserRouter, Route} from 'react-router-dom'
import {Cuento} from './components/tereUI/Cuento'
import {Stitch, RemoteMongoClient} from "mongodb-stitch-browser-sdk";
import {Cuentos} from  './components/tereUI/Cuentos'
import {Comentario} from './components/tereUI/Comentario'
import {UserCuentos} from './components/userUI/UserCuentos'
import {BotonLeerCuento} from './components/userUI/BotonLeerCuento'
import {GestionarComentarios} from './components/tereUI/GestionarComentarios'
import {ListadoComentarios} from './components/tereUI/ListadoComentarios'
import {Test} from './components/Test'
import {Menu} from './components/userUI/Menu'
import {Login} from './components/userUI/Login'

import 'bootstrap/dist/css/bootstrap.min.css';


export const stitch = Stitch.initializeAppClient('appcuentos-kcyur')
// if (!stitch.auth.isLoggedIn){
//     stitch.auth.loginWithCredential(new AnonymousCredential())
// }
export const mongo = stitch.getServiceClient(RemoteMongoClient.factory,'mongodb-atlas')


const rutas =(
    <BrowserRouter>

    <Route exact path="/" component={Menu} />
    <Route path="/cuento/:id" component={Cuento} />
    <Route path="/cuentos" component={Cuentos} />
    <Route path="/comentario" component={Comentario} />
    <Route path="/usercuentos" component={UserCuentos} />
    <Route path="/leercuento/:id" component={BotonLeerCuento} />
    <Route path="/gestionarcomentarios/:id" component={GestionarComentarios} />
    <Route path="/listadocomentarios" component={ListadoComentarios} />
    <Route path="/test" component={Test} />
    <Route path="/menu" component={Menu} />
    <Route path="/login" component={Login} />
    </BrowserRouter>
)


ReactDOM.render(rutas, document.getElementById('root'))