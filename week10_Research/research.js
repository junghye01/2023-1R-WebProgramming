
// 일반 함수의 this
//1.
function func1(){
    console.log(this);
}

func1();
//2.
const obj ={
    name:'짱구',
    method() {
        console.log(this.name); // 짱구
    }
}

//3.
function funcFactory() {
    console.log(this);
}

new funcFactory(); //funcFactory


//2) 화살표 함수의 this
let myObj= {
    age:20,
    //arrowFunc : () => {
     //   console.log(this.age);
    //},
    normalFunc() {
        console.log(this.age);
    }
}

//myObj.arrowFunc();// undefined
myObj.normalFunc(); // 20



//2. Arguments

function regularFunc() {
    console.log(arguments);
}

const arrowFunc = (...args) => {
    console.log(args);
}

regularFunc(1,2,3);

arrowFunc(1,2,3);

//3. 생성자 함수
// 일반 함수

function Person(name,age){
    this.name=name;
    this.age=age;
}

const person1=new Person('김정혜',23);

console.log(person1.name,person1.age);

// 화살표 함수
const arrow_person = (name, age) => {
    this.name = name;
    this.age = age;
  };
  
const person2 = new arrow_person('김정혜', 23); // TypeError: arrow_person is not a constructor
  



