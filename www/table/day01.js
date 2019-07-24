let arr =[];
console.log(typeof 1);
console.log(arr instanceof Array);
let a =1;
b =a;
console.log(b);
a=3;
console.log(b);

let selected = {
    data:[],
    showData:[],
    currentPage:1,
    number:0
};



let state = {
    selected:{
        data:[],
        showData:[],
        currentPage:1,
        number:0
    }
};

let {data} = state.selected;

console.log(data);
