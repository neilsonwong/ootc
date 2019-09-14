export class User {
  id: string;
  name: string;
  age: number;
  isAdmin: boolean;

  constructor(id: string, name: string, age: number, isAdmin: boolean) {
  	this.id = id;
  	this.name = name;
  	this.age = age;
  	this.isAdmin = isAdmin;
  }
}
