// Classe intermediária para definir um nó
class Node {
  constructor(node, leftChild = null, rightChild = null) {
    this.node = node;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(root) {
    let heightCount = 0;

    if (!root) {
      heightCount = -1;
    } else {
      const leftHeight = this.getHeight(root.leftChild);
      const rightHeight = this.getHeight(root.rightChild);

      heightCount = Math.max(leftHeight, rightHeight) + 1 // Verificar o maior lado e somar 1 para que a altura fique correta
    }
  };

  getBalance(root) {
    const balance = this.getHeight(root.rightChild) - this.getHeight(root.leftChild);
    return balance;
  }

  add(payload) {
    const newNode = new Node(payload);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNewNode(this.root, newNode);
    }
  };

  insertNewNode(parentNode, newNode) {
    if (newNode.node < parentNode.node) {
      if (!parentNode.leftChild) {
        parentNode.leftChild = newNode;
      } else {
        this.insertNewNode(parentNode.leftChild, newNode);
      }
      // Após a inserção, verificar o fator de balanceamento e então realizar a rotação necessária

      if (parentNode.leftChild && this.getBalance(parentNode) > 1) { // balanceamento é maior que 1
        if (newNode.node > parentNode.leftChild.node) { // checar se o nó a ser inserido é maior que o nó pai
          parentNode = this.rotateLeft(parentNode);
        } else {
          parentNode = this.rotateLeftRight(parentNode);
        }
      }
    } else {
      if (!parentNode.rightChild) {
        parentNode.rightChild = newNode;
      } else {
        this.insertNewNode(parentNode.rightChild, newNode);
      }

      // Após a inserção, verificar o fator de balanceamento e então realizar a rotação necessária

      if (parentNode.rightChild && this.getBalance(parentNode) < -1) { // balanceamento é menor que -1
        if (newNode.node > parentNode.rightChild.node) { // checar se o nó a ser inserido é maior que o nó pai
          parentNode = this.rotateRight(parentNode);
        } else {
          parentNode = this.rotateRightLeft(parentNode);
        }
      }
    }
  };

  delete(payload) {
    this.root = this.removeNode(this.root, payload);
  }

  removeNode(parentNode, nodeValue) {
    if (!parentNode) {
      return null; // Árvore vazia permanece vazia
    } else if (nodeValue < parentNode.node) { // Nó a ser deletado está na sub árvore da esquerda
      parentNode.leftChild = this.removeNode(parentNode.leftChild, nodeValue);
    } else if (nodeValue > parentNode.node) { // Nó a ser deletado está na sub árvore da direita
      parentNode.rightChild = this.removeNode(parentNode.rightChild, nodeValue);
    }

    // Nó a ser deletado é o nó pai em questão

    else if (!parentNode.leftChild && !parentNode.rightChild) { // Nó não possui filhos, pode ser deletado
      parentNode = null;
    } else if (!parentNode.leftChild) { // Nó possui somente o filho da direita
      parentNode = parentNode.rightChild;
    } else if (!parentNode.rightChild) { // Nó possui somente o filho da esquerda
      parentNode = parentNode.leftChild;
    } else {
      // Nó a ser deletado possui dois filhos
      const replacement = this.findNodeReplacement(parentNode.rightChild);
      parentNode.node = replacement.node;
      parentNode.rightChild = this.removeNode(parentNode.rightChild, replacement.node);
    }

    if (!parentNode) {
      return parentNode
    }
    return this.balanceTreeAferRemoveNode(parentNode) || parentNode;
  }

  balanceTreeAferRemoveNode(root) {
    if (this.getBalance(this.root) > 1) {
      if (this.getBalance(this.root.leftChild) >= 0) {
        return this.rotateRight(this.root);
      } else {
        return this.rotateLeftRight(this.root);
      }
    }

    if (this.getBalance(this.root) < -1) {
      if (this.getBalance(this.root.rightChild) <= 0) {
        return this.rotateLeft(this.root);
      } else {
        return this.rotateRightLeft(this.root);
      }
    }
  }

  rotateLeft(node) {
    let newNode = node.leftChild;
    node.leftChild = newNode.rightChild;
    newNode.rightChild = node;
    return newNode;
  }

  rotateRight(node) {
    let newNode = node.rightChild;
    node.rightChild = newNode.leftChild;
    newNode.leftChild = node;
    return newNode;
  }

  rotateLeftRight(node) {
    node.leftChild = this.rotateRight(node.left);
    return this.rotateLeft(node);
  }

  rotateRightLeft(node) {
    node.rightChild = this.rotateLeft(node.rightChild);
    return this.rotateRightLeft(node);
  }
}

const example = new AVLTree;
example.add(2)
example.add(1)
example.add(3)
console.log(example)
example.delete(1)
console.log(example)