import React, { Component } from 'react'
import { mongo } from '../index'
import { ObjectId } from 'bson'
import ReactPlayer from 'react-player'


export class BotonLeerCuento extends Component {
    state = {
        cuento: {}


    }

    componentDidMount = () => { //traer listado cuentos

        this.cuento.findOne({ _id: new ObjectId(this.props.match.params.id) }).then(c => {

            this.setState({ cuento: c })
            console.log(c)
        })
        window.onclick = (event) => {
            if (event.target === document.getElementById('mimodal')) {
                document.getElementById('mimodal').style.display = 'none'
            }
        }
    }

    cuento = mongo.db('miapp').collection('cuentos')

    render() {

        return (
            <div>
                <LeerCuento cuento {...this.state.cuento} />
                {/* {JSON.stringify(this.state.cuento)} */}

            </div>
        )
    }
}

// class LeerCuento extends Component {
//     render() {
//         return (
//             <div className="card mb-3" className="div-leercuento">
//                 <h1 className="card-title">{this.props.titulo}</h1>
//                 <img src={this.props.imagen} alt="Card image cap" width="200px" />
//                 <div className="card-body">
//                     <p className="card-text">{this.props.argumento}</p>
//                     <ReactPlayer width="50" height="50" url={this.props.video} />
//                 </div>
//                 <h4 className="card-text"><small className="text-muted">{this.props.moraleja}</small></h4>
//             </div>
//         )
//     }
// }

class LeerCuento extends Component {
    render() {
        return (


            
                <div className="modal-dialog modal-lg"  >
                    <div className="modal-content">
                        <div className="modal-header" className="div-leercuento">
                            <img src={this.props.imagen} alt="Card image cap" width="550px" />
                        </div>
                        <div className="modal-body" className="div-leercuento">
                            <h1 className="modal-title" className="div-leercuento">{this.props.titulo}</h1>
                            <p className="card-text" className="div-leercuento">{this.props.argumento}</p>
                            <ReactPlayer width="700px" height="500px" url={this.props.video} />
                        </div>
                        <div className="modal-footer">
                            <h4><small className="text-muted">{this.props.moraleja}</small></h4>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Terminar</button>
                        </div>

                    </div>
                </div>
            


        )
    }
}