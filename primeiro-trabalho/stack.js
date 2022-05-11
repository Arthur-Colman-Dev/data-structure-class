/*
  OBJETIVO: Implementar uma lista que permita a inserção e remoção de elementos pelo final da lista
*/

// Definição da estrutura de dados
class Stack {
  // Inicialização do objeto da classe
  constructor() {
    this.list = [];
  }

  // Ações disponíveis para uso
  add(item) {
    return this.list.push(item);
  }

  remove() {
    return this.list.pop();
  }

  getList() {
    return this.list;
  }
}

// Demonstração de uso da estrutura
let stack = new Stack; // Inicialização de uma nova lista
console.log(stack.getList()); // []
stack.add(1); // Adicionar o item "1" na lista
console.log(stack.getList()); // [ 1 ]
stack.add('UFRJ'); // Adicionar o item "UFRJ" na lista
console.log(stack.getList()); // [ 1, 'UFRJ' ]
stack.remove(); // Remover um item da lista, lembrando que pela definição da lista o item a ser removido será o último da lista
console.log(stack.getList()); // [ 1 ]
