import LinkedList from '../linked-list/LinkedList';

// 使用链表实现 栈
export default class Stack {
    constructor(){
        this.linkedList = new LinkedList()
    }

    // isEmpty
    isEmpty(){
        return !this.linkedList.head
    }

    // 查看第一个元素
    // 返回栈顶（即链表头部）的元素值，但不移除它
    peek(){
        if(this.isEmpty()) {
            return null
        }

        return this.linkedList.head.value
    }

    // push 前置添加
    // 在栈顶（链表头部）添加一个新元素
    push(value){
        this.linkedList.prepend(value)
    }

    // delete
    // 移除并返回栈顶（链表头部）的元素 成功删除了元素，返回被删除元素的值
    pop(){
        const removedHead = this.linkedList.deleteHead()

        return removedHead ? removedHead.value : null
    }

    toArray(){
        return this.linkedList.toArray().map(LinkedListNode => LinkedListNode.value)
    }

    toString(callback){
        return this.linkedList.toString(callback)
    }
}