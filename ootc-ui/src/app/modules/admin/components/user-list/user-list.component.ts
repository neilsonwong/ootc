import { Component, OnInit } from '@angular/core';

interface User {
  id: string;
  email: string;
  fname: string;
  mname: string;
  lname: string;
  phone: number;
  age: number;
}

export const Users: User[] = [
  {id: '1', email: "abc@gmail.com", fname: 'Timmy', mname: 'User', lname: 'Cheng', phone: 123, age: 24},
  {id: '2', email: "def@gmail.com", fname: 'Neilson', mname: 'List', lname: 'Wong', phone: 456, age: 26 },
  {id: '3', email: "ghi@gmail.com", fname: 'Martin', mname: 'Management', lname: 'Fan', phone: 789, age: 21 },
  {id: '4', email: "jkl@gmail.com", fname: 'Clifton', mname: 'Works', lname: 'Cheung', phone: 101, age: 24 },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
