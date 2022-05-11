/*
  OBJETIVO: Implementar uma lista que permita a inserção e remoção de elementos por finais opostos da lista
*/

// Definição da estrutura de dados
class Queue {
  // Inicialização do objeto da classe
  constructor() {
    this.list = [];
  }

  // Ações disponíveis para uso
  add(item) {
    return this.list.push(item);
  }

  remove() {
    return this.list.shift();
  }

  getList() {
    return this.list;
  }
}

// Demonstração de uso da estrutura
let queue = new Queue; // Inicialização de uma nova lista
console.log(queue.getList()); // []
queue.add(1); // Adicionar o item "1" na lista
console.log(queue.getList()); // [ 1 ]
queue.add('UFRJ'); // Adicionar o item "UFRJ" na lista
console.log(queue.getList()); // [ 1, 'UFRJ' ]
queue.remove(); // Remover um item da lista, lembrando que pela definição da lista o item a ser removido será o primeiro da lista
console.log(queue.getList()); // [ 'UFRJ' ]
