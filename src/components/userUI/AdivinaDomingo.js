import React  from 'react'

class Adivinanza {
  texto = '';
  solucion = 'MANZANA';
  dificultad = 1;
}

export class Uno extends React.Component {
  state = { 
   adivinanza: new Adivinanza(),
   solucion: ''
  }

  render(){
    let letras = this.state.adivinanza.solucion.split('');
    return (
      <div>
        escribe la solucion: 
        <input
          value={this.state.solucion}
          onChange={e => this.setState({ solucion: e.target.value })} 
          className="form-control"/>
      <div className="form-inline">
         { letras.map( (letra, i) => <Letra className="form-inlines" key={i} letra={letra} /> ) }
      </div>
      </div>
    )
  }
}


class Letra extends React.Component {
  state = { letra: this.props.letra}
  render() {    
    return (
        <input 
          className="form-control"
          size="1"
          type="password"
          style={{ fontSize: "20px"}}
          value={this.state.letra}
          onChange={ (e) => {
            this.setState({ letra: e.target.value })
          }}
          onClick={ (e) => { 
            e.target.type = "text"
          } }
        />
      )
  }
}
