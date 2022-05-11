/*
  OBJETIVO: Implementar uma estrutura de dados formada por três listas:
    1. Lista A que permita a inserção de dados
    2. Lista S que permita a inserção do index do dado inserido na Lista A
    3. Lista B que permita a inserção do index do valor inserido na Lista S para o dado inserido em A
*/

// Definição da estrutura de dados
class ArrayForBusyPeople {
  // Inicialização do objeto da classe
  constructor(v = 0, n = 10) {
    this.A = []; // lista que aramzena os itens passados para a função set definida abaixo
    this.B = []; // lista que aramazena os indexes dos itens definidos em na lista S
    this.S = []; // lista que armazena os indexes dos itens definidos na lista A
    this.v = v; // valor default dos itens não definidos no array
    this.n = n; // total de itens que a lista pode receber
    this.totalItems = 0; // total de itens inseridos
  }

  // checar se o item já está definido em A através das demais listas
  isDefined(i) {
    return (
      i < this.n // index do item menor que o número de itens no array
      && this.S[this.B[i]] == i // index do item na lsita S é igual ao index buscado
      && this.B[i] >= 0 // index do item na lista S é maior que 0
      && this.B[i] < this.totalItems // index do item na lista S é menor que o número total de itens
    );
  }

  // inserir nas listas caso o index desejado esteja dentro do espectro suportado pelas listas
  set(i, x) {
    if ( i >= 0 && i < this.n ) {
      this.B[i] = this.totalItems;
      this.S[this.totalItems] = i;
      this.totalItems += 1;
      this.A[i] = x;
    } else {
      console.log('O index fornecido é maior que o suportado pela lista')
    }
  }

  // obter o item cujo index é passado para a função
  get(i) {
    if (i >= 0 && i < this.n) {
      return this.isDefined(i) ? this.A[i] : this.v
    }

    return 'O index fornecido é maior que o suportado pela lista'
  }

  // define todos os elementos da lista como v
  init(v) {
    this.v = v
    this.A = []
    this.B = []
    this.S = []
  };
}

// Demonstração de uso da estrutura
let array = new ArrayForBusyPeople(v=20, n=100); // Inicialização de uma nova lista
array.set(3, 'pig')
array.set(0, 'cat')
array.set(4, 'dog')
array.set(11, 'bilbo')
console.log(array)
console.log(array.get(4))
console.log(array.get(30))
console.log(array.get(11))
array.init('ufrj')
console.log(array.get(0))
