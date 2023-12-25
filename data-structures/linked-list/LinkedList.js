import LinkedListNode from "./LinkedListNode";
import Comparator from '../utils/comparator/Comparator.js'; 

export default class LinkedList{
     /**
   * @param {Function} [comparatorFunction]
   */
    constructor(comparatorFunction) {
        this.head = null 
        this.tail = null

        this.compare = new Comparator(comparatorFunction)
    }

   // 前置插入
  prepend(value){
    // 该节点的值为传入的参数 value，并且将新节点的下一个节点（next）指向当前链表的头节点（this.head）
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    // 如果链表没有尾节点（this.tail为假），则将尾节点（this.tail）也设置为新创建的节点 newNode。这是因为链表为空时，新节点既是头节点也是尾节点
    if(!this.tail){
        this.tail = newNode
    }

    // 返回链表对象，以便支持链式调用
    return this
  }

  // 尾部插入
  append(value){
    const newNode = new LinkedListNode(value)

    if(!this.head){
        this.head = newNode
        this.tail = newNode

        return this 
    }

    this.tail.next = newNode 
    // 更新 newNode 为新的尾部
    this.tail = newNode

    return this
  }

  // 任意 index 地方插入数据
  insert(value, rawIndex){
    const index = rawIndex < 0 ? 0 : rawIndex
    if(index === 0){
        this.prepend(value)
    }else{
        let count = 1
        let currentNode = this.head 
        const newNode = new LinkedListNode(value)
        while(currentNode){
            if(index === count) break
            currentNode = currentNode.next
            count += 1
        }

        if(currentNode){
            //  将新节点的 next 指向当前节点的下一个节点，以保持链表的连接。
            newNode.next = currentNode.next 
            // 将当前节点的 next 指向新节点，完成插入操作。
            currentNode.next = newNode
        }else{
            if(this.tail){
                this.tail.next = newNode
                this.tail = newNode
            }else{
                this.head = newNode 
                this.tail = newNode
            }
        }
    }

    return this
  }

  // 删除节点
  delete(value){
    if(!this.head){
        return null
    }

    let deleteNode = null 
    while(this.head && this.compare.equal(this.head.value, value)){
        deleteNode = this.head 
        this.head = this.head.next
    }

    let currentNode = this.head 
    if(currentNode !== null){
        while(currentNode.next){
            // 要删除的是 currentNode.next
            if(this.compare.equal(currentNode.next.value, value)){
                // 将要删除的节点赋给 deletedNode, 即标记要删除的节点
                deleteNode = currentNode.next
                // 跳过下一个节点，直接将当前节点的 next 指向下下个节点，从而删除了目标节点
                currentNode.next = currentNode.next.next
            }else{
                // 如果值不相等，通过 currentNode = currentNode.next; 将 currentNode 移动到下一个节点，继续检查
                currentNode = currentNode.next
            }
        }
    }

        // Check if tail must be deleted.
        if(this.compare.equal(this.tail.value, value)){
            this.tail = currentNode
        }

        return deleteNode
  } 

  // find 
  find({value = undefined, callback = undefined}) {
    if(!this.head) return null 

    let currentNode = this.head

    while(currentNode){
        // If callback is specified(指定的) then try to find node by callback.
        if(callback && callback(currentNode.value)){
            return currentNode
        }

        // If value is specified(指定的) then try to compare by value..
        if(value !== undefined && this.compare.equal(currentNode.value, value)){
            return currentNode
        }

        currentNode = currentNode.next
    }

    return null
  }

  deleteTail(){
    const deletedTail = this.tail

    // There is only one node in linked list.
    if(this.head === this.tail){
        this.head = null 
        this.tail = null

        return deletedTail
    }

    // If there are many nodes in linked list...
    let currentNode = this.head
    while(currentNode.next){
        if(!currentNode.next.next){ // 这就说明 currentNode.next 是 尾节点
            currentNode.next = null // 尾节点 置空 就是删除 
        }else{
            currentNode = currentNode.next
        }
    }   

    this.tail = currentNode

    return deletedTail
  }

  // 删除头节点 
   deleteHead(){
    if(!this.head){
        return null
    }

    const deletedHead = this.head 
    
    if(this.head.next){
        this.head = this.head.next
    }else{
        this.head = null 
        this.tail = null 
    }

    return deletedHead
   }

  // 数组转链表
  fromArray(values){
    values.forEach(value => this.append(value))

    return this
  }

  // 链表转数组
  toArray(){
    const nodes = []

    let currentNode = this.head
    while(currentNode){
        nodes.push(currentNode)
        currentNode = currentNode.next
    }

    return nodes
  }

  // toString
  toString(callback){
    return this.toArray().map(node => node.toString(callback)).toString()
  }

  // reverse
  reverse(){
    let currentNode = this.head
    let prevNode = null 
    let nextNode = null 

    while(currentNode){
        // Store next node.
        nextNode = currentNode.next 

        // Change next node of the current node so it would link to previous node.
        currentNode.next = prevNode

        // Move prevNode and currNode nodes one step forward.
        prevNode = currentNode 
        currentNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    return this
  }
}