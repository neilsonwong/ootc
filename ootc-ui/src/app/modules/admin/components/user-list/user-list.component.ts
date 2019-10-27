import { Component, OnInit } from '@angular/core';

interface User {
  email: string;
  fname: string;
  lname: string;
  phone: number;
  age: number;
  experience: number;
  isAdmin: boolean;
}

export const Users: User[] = [
  {email: "abc@gmail.com", fname: 'Timmy', lname: 'Cheng', phone: 123, age: 24 ,experience : 10, isAdmin: true},
  {email: "def@gmail.com", fname: 'Neilson', lname: 'Wong', phone: 456, age: 26 ,experience : 10, isAdmin: true },
  {email: "ghi@gmail.com", fname: 'Martin', lname: 'Fan', phone: 789, age: 21 ,experience : 10, isAdmin: false },
  {email: "jkl@gmail.com", fname: 'Clifton', lname: 'Cheung', phone: 101, age: 24 ,experience : 10, isAdmin: false },
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
