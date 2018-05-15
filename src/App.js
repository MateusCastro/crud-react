import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props) // Método para atender o construtor da classe pai
    this.state = {
      titulo: "CRUD simples com React", // Título da página
      acao: 0, // Definirá se a ação é de inserir ou Alterar. 0 para inserir e 1 para alterar
      indice: "", // Posição do dado no array caso a ação seja de Alterar
      dados: []
    }
  }

  salvar = (e) => {
    e.preventDefault()
    let dados = this.state.dados // Recebe os dados
    let nome = this.refs.nome.value // Recebe as informações do input nome
    let cargo = this.refs.cargo.value // Recebe as informações do input Cargo

    if(this.state.acao == 0){ // Caso a ação seja de inserir
      let dado = { // variável com modelo do dado
        nome, cargo
      }
      dados.push(dado) // inserindo na ultima posição da variável que recebe os dados
    }else{ // caso a ação seja de alterar
      let indice = this.state.indice // Recebe a posição do dado no array
      dados[indice].nome = nome // Altera o campo nome
      dados[indice].cargo = cargo // Altera o campo cargo
    }

    this.setState({ // Método para setar a variável state
      dados: dados, // recebe os dados atualizados
      acao: 0 // retorna o campo acao para o valor default
    })

    this.refs.formulario.reset() // reseta o formulário
  }

  remover = (i) => {
    let dados = this.state.dados // recebe os dados
    dados.splice(i, 1) // Motodo para remover a posição no array
    this.setState({ // Método para setar a variável state
      dados: dados // Altera o campo dados
    })
    this.refs.formulario.reset() // reseta o formulário
  }

  editar = (i) => {
    let dados = this.state.dados[i] // recebe dados 
    this.refs.nome.value = dados.nome // Preenche o campo Nome com o valor do dado que quer editar
    this.refs.cargo.value = dados.cargo // Preenche o campo cargo com o valor do dado que quer editar

    this.setState({ // Método para setar state
      acao: 1, // Altera a ação pra editar
      indice: i // altera para o indice do dado
    })

    this.refs.nome.focus() // foca o cursor no campo nome
    
  }

  render() {
    let dados = this.state.dados // recebe dados
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
            dados.map((item, i) => // percorre a variável dados que recebeu o Dados de state
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

export default App; // exporta a classe app
