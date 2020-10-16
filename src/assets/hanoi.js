const A = {
    name: 'A',
    stack: [4,2]
}
const B = {
    name: 'B',
    stack: [3,1]
}
const C = {
    name: 'C',
    stack: []
}
history = []
let assumption = true

const extendedHanoi = function (n,A,B,C){
    if (n === 1 ){
        move(A,C)
        move(B,C)
    } else {
        extendedHanoi(n-1,A,B,C)
        if (assumption) {
            move(B,A)
            hanoi(2*n-2,C,B,A)
            hanoi(2*n,A,B,C)
        } else {
            hanoi(2*n-2,C,A,B)
            move(A,C)
            hanoi(2*n-1,B,A,C)
        }
    }
}
const hanoi = function (n, from, via ,to) {
    if (n === 0) return;
        hanoi(n-1, from, to , via);
        move(from,to);
        hanoi(n-1, via, from , to);
}
const move = function (A,B){
    const popped = A.stack.pop();
    B.stack.push(popped)
    history.push({
        from: A.name,
        to: B.name,
        disk: popped
    })
    printState()
}
const printState = function (){
    console.log(A.stack,B.stack,C.stack)
}
printState()
extendedHanoi(2,A,B,C)
console.log(history)
