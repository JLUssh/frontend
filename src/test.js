// // 声明装饰器修饰方法/属性
// function method(
//   target: any,
//   propertyKey: string,
//   descriptor: PropertyDescriptor
// ) {
//   console.log(target);
//   console.log("prop " + propertyKey);
//   console.log("desc " + JSON.stringify(descriptor) + "\n\n");
//   descriptor.writable = false;
// }
// function property(target: any, propertyKey: string) {
//   console.log("target", target);
//   console.log("propertyKey", propertyKey);
//   console.log("====================");
// }
// class Person {
//   @property
//   name: string;
//   constructor() {
//     this.name = "huihui";
//   }
//   @method
//   say() {
//     return "instance method";
//   }
//   @method
//   static run() {
//     return "static method";
//   }
// }
// const xmz = new Person();
// // 修改实例方法say
// xmz.say = function () {
//   return "edit";
// };
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var foo = new NewableFoo();
// 上面有问题，参考这个
// https://stackoverflow.com/questions/13407036/how-does-interfaces-with-construct-signatures-work
// interface Foo {
//   name: string;
// }
// interface FooStruct {
//   new (n: string): Foo;
// }
// class FooFromString implements Foo {
//   constructor(public name: string) {
//     console.log("ctor invoked");
//   }
// }
// function FooObj(n: FooStruct) {
//   return new n("hello!");
// }
// console.log(FooObj(FooFromString).name);
