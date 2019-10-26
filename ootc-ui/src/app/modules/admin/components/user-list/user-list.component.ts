import { Component, OnInit } from '@angular/core';

interface User {
  name: string;
  position: number;
}

export const Users: User[] = [
  {position: 1, name: 'Timmy'},
  {position: 2, name: 'Neilson'},
  {position: 3, name: 'Martin'},
  {position: 4, name: 'Clifton'},
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
