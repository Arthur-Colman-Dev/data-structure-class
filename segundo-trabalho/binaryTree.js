// Classe intermediária para definir um nó
class Node {
  constructor(node, leftChild = null, rightChild = null) {
    this.node = node;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(payload) {
    const newNode = new Node(payload);

    if (!this.root) {
      this.root = newNode; // Inserir o nó inicial
    } else {
      this.insertNewNode(this.root, newNode); // Inserir nó adicional
    }
  };

  insertNewNode(parentNode, newNode) {
    if (newNode.node < parentNode.node) { // Se o nó é menor que o pai, checar o lado esquerdo
      if (!parentNode.leftChild) { // Se o lado esquerdo do pai estiver vazio, inserir
        parentNode.leftChild = newNode;
      } else { // Caso contrário, seguir buscando um pai que possa receber o filho para inserir
        this.insertNewNode(parentNode.leftChild, newNode);
      }
    } else {
      if (!parentNode.rightChild) { // Se o lado direito do pai estiver vazio, inserir
        parentNode.rightChild = newNode;
      } else { // Caso contrário, sguir buscando um pai que possa receber o filho para inserir
        this.insertNewNode(parentNode.rightChild, newNode);
      }
    }
  };

  delete(payload) {
    this.root = this.removeNode(this.root, payload);
  }

  removeNode(parentNode, nodeValue) {
    if (!parentNode) {
      return null; // Árvore vazia permanece vazia
    }

    if (nodeValue < parentNode.node) { // Nó a ser deletado está na sub árvore da esquerda
      parentNode.leftChild = this.removeNode(parentNode.leftChild, nodeValue);
      return parentNode;
    }

    if (nodeValue > parentNode.node) { // Nó a ser deletado está na sub árvore da direita
      parentNode.rightChild = this.removeNode(parentNode.rightChild, nodeValue);
      return parentNode;
    }

    // Nó a ser deletado é o nó pai em questão

    if (!parentNode.leftChild && !parentNode.rightChild) { // Nó não possui filhos, pode ser deletado
      parentNode = null;
      return parentNode;
    }

    if (!parentNode.leftChild) { // Nó possui somente o filho da direita
      parentNode = parentNode.rightChild;
      return parentNode;
    }

    if(!parentNode.rightChild) { // Nó possui somente o filho da esquerda
      parentNode = parentNode.leftChild;
      return parentNode;
    }

    // Nó a ser deletado possui dois filhos
    const replacement = this.findNodeReplacement(parentNode.rightChild);
    parentNode.node = replacement.node;
    parentNode.rightChild = this.removeNode(parentNode.rightChild, replacement.node);
    return parentNode;
  }

  // Para achar o nó inorder para substituir, comece pela sub árvore da direita e procure o nó mais a esquerda desta árvore, ou seja, o nó sem filhos a esquerda
  findNodeReplacement(nodeRightChild) {
    if(!nodeRightChild.left) {
      return nodeRightChild;
    }

    return this.findNodeReplacement(nodeRightChild.left);
  }
}

const example = new BinarySearchTree;
example.add(2);
example.add(1);
example.add(3);
example.add(4);
example.add(5);
console.log(example);
example.delete(3);
console.log(example);