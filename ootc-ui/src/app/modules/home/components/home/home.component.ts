import { Component, OnInit } from '@angular/core';
import { Observable, of, partition, GroupedObservable } from 'rxjs';
import { flatMap, toArray, groupBy, merge, mergeMap, filter } from 'rxjs/operators';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // users$: Observable<User[]>;
  // admins$: Observable<User[]>;
  tens$: Observable<User[]>;
  elevens$: Observable<User[]>;
  twelves$: Observable<User[]>;
  everyone$: Observable<User[]>;

  constructor() { }

  ngOnInit() {
    this.everyone$ = this.getAllUsers();
    // const [admins$$, users$$] = partition(this.everyone$.pipe(flatMap(x => x)), p => p.isAdmin);
    const testy = this.everyone$.pipe(
      flatMap(x => x),
      groupBy(person => person.age),
      // mergeMap(group => group.pipe(toArray())),
    );    

    this.tens$ = this.groupByAge(testy, 10);
    this.elevens$ = this.groupByAge(testy, 11);
    this.twelves$ = this.groupByAge(testy, 12);


    // this.admins$ = admins$$.pipe(toArray());
    // this.users$ = users$$.pipe(toArray());
  }

  groupByAge(testy: Observable<GroupedObservable<number, User>>, age: number) {
    return testy.pipe(
      filter(e => e.key === age),
      mergeMap(group => group.pipe(toArray())),
    );
  }

  getAllUsers(): Observable<User[]> {
    return of([
      new User('1', 'neilson1', 10, false),
      new User('2', 'neilson2', 11, false),
      new User('3', 'neilson3', 12, false),
      new User('4', 'neilson4', 10, false),
      new User('5', 'neilson5', 11, true),
      new User('6', 'neilson6', 12, true),
      new User('7', 'neilson7', 10, true),
      new User('8', 'neilson8', 11, true),
      new User('9', 'neilson9', 12, true),
    ]);
  }
}
