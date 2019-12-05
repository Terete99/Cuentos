import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import {Home} from './components/GestionProductos'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Cuento } from './components/tereUI/Cuento'
import { Stitch, RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { Cuentos } from './components/tereUI/Cuentos'
import { Comentario } from './components/tereUI/Comentario'
import { UserCuentos } from './components/userUI/UserCuentos'
import { BotonLeerCuento } from './components/userUI/BotonLeerCuento'
import { GestionarComentarios } from './components/tereUI/GestionarComentarios'
import { ListadoComentarios } from './components/tereUI/ListadoComentarios'
import { Test } from './components/Test'
import { Menu } from './components/userUI/Menu'
import { Login } from './components/userUI/Login'
import { Trabalenguas } from './components/tereUI/Trabalenguas'
import { TrabalenguasUI } from './components/userUI/TrabalenguasUI'
import { FormularioEntradas, ListadoEntradas, } from './components/Blog'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export const stitch = Stitch.initializeAppClient('appcuentos-kcyur')
// if (!stitch.auth.isLoggedIn){
//     stitch.auth.loginWithCredential(new AnonymousCredential())
// }
export const mongo = stitch.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')

const menu1 = (
    <div>





        <Navbar bg="light" variant="info">
            {/* mi app */}
            <Navbar.Brand><Link to={`/cuentos`}> Cuentos </Link></Navbar.Brand>
            <Nav className="mr-auto link">
                {/* el del user */}
                <Nav.Link > <Link to={`/trabalenguasuser`} >  Trabalenguas </Link></Nav.Link>
                <Nav.Link> <Link to={`/usercuentos`} >  Cuentos user </Link></Nav.Link>
                <Nav.Link> <Link to={`/login`} > Login </Link></Nav.Link>
            </Nav>
        </Navbar>

    </div>

)

const rutas = (

    <BrowserRouter>

        {menu1}


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
        <Route path="/trabalenguas" component={Trabalenguas} />
        <Route path="/trabalenguasuser/" component={TrabalenguasUI} />
        <Route path="/blog/:id" component={FormularioEntradas} />
        <Route path="/blog2" component={ListadoEntradas} />
        <Route path="/blog" component={ListadoEntradas}
        />


    </BrowserRouter>
)


ReactDOM.render(rutas, document.getElementById('root'))