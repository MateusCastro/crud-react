import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      titulo: "CRUD simples com React",
      acao: 0,
      indice: "",
      dados: []
    }
  }

  salvar = (e) => {
    e.preventDefault()
    let dados = this.state.dados
    let nome = this.refs.nome.value
    let cargo = this.refs.cargo.value

    if(this.state.acao == 0){
      let dado = {
        nome, cargo
      }
      dados.push(dado)
    }else{
      let indice = this.state.indice
      dados[indice].nome = nome
      dados[indice].cargo = cargo
    }

    this.setState({
      dados: dados,
      acao: 0
    })

    this.refs.formulario.reset()
  }

  remover = (i) => {
    let dados = this.state.dados
    dados.splice(i, 1)
    this.setState({
      dados: dados
    })
    this.refs.formulario.reset()
  }

  editar = (i) => {
    let dados = this.state.dados[i]
    this.refs.nome.value = dados.nome
    this.refs.cargo.value = dados.cargo

    this.setState({
      acao: 1,
      indice: i
    })

    this.refs.nome.focus()
    
  }

  render() {
    let dados = this.state.dados
    return (
      <div className="App">
        <h1>{this.state.titulo}</h1>
        <form ref="formulario">
          <label>Nome:</label><input type="text" ref="nome"></input><br></br>
          <label>Cargo:</label><input ref="cargo"></input><br></br>
          <button onClick={(e)=>this.salvar(e)}>enviar</button>
        </form>
        <hr></hr>
        <pre>
          {
            dados.map((item, i) => 
              <li>
                <label>{item.nome},  {item.cargo}</label>
                <button onClick={()=>this.remover(i)}>remover</button>
                <button onClick={()=>this.editar(i)}>editar</button>
              </li>
            )
          }
        </pre>
      </div>
    );
  }
}

export default App;
