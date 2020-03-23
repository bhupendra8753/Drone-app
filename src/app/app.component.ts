import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  a;                                                       // variable for the arrow direction
  rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];           // the size of rows i.e 9 (hard coded)
  columns: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];        // the size of columns i.e 9
  x: number[] = [];                                       // the array for storing only the x coordinates
  y: number[] = [];                                       // the array for storing only the y coordinates
  move: string = '';                                      // variable for storing the user's direction by selecting from the dropdown
  direction: string[] = ['Up', 'Down'];                   // the array for storing the directions
  newArrx: number[] = [];                                 // the array for storing the value of x coordinates which the drone has move
  newArry: number[] = [];                                 // the array for storing the value of y coordinates which the drone has move
  cordinates: Array<number>[] = [];                       // the array for storing the path coordinates
  constructor() {

  }

  ngOnInit() {

  }

  select(m , n) {                                       // on click event function binded through the view i.e html
    console.log(m, n);
    this.x.push(m);                                     // pushes the x coordinates of starting and end points
    console.log(this.x);
    this.y.push(n);                                     // pushes the y coordinates of starting and end points
    console.log(this.y);

    if (this.x.length === 2) {                          // checks if the length of the x array is 2
      while (this.y[0] < this.y[1]) {
        this.newArrx.push(this.x[0]);
        this.newArry.push(this.y[0]);
        if (this.move === 'Up' ) {                      // function for Up direction
          while (this.x[0] > 1) {
            this.x[0]--;
            this.newArrx.push(this.x[0]);
            this.newArry.push(this.y[0]);
            this.a = '^';
          }
        }
        if (this.move === 'Down') {                    // function for Down direction
          while (this.x[0] < this.rows[this.rows.length - 1]) {
            this.x[0]++;
            this.newArrx.push(this.x[0]);
            this.newArry.push(this.y[0]);
            this.a = 'v';
            console.log(this.x[0], this.y[0]);
          }
        }
        this.y[0]++;
        this.newArrx.push(this.x[0]);
        this.newArry.push(this.y[0]);
        console.log(this.x[0], this.y[0]);
      }
      while (this.y[0] > this.y[1]) {
        if (this.move === 'Up') {
          while (this.x[0] > 1) {
            this.x[0]--;
            this.newArrx.push(this.x[0]);
            this.newArry.push(this.y[0]);
            this.a = '^';
            console.log(this.x[0], this.y[0]);
          }
        }
        if (this.move === 'Down') {
          while (this.x[0] < this.rows[this.rows.length - 1]) {
            this.x[0]++;
            this.newArrx.push(this.x[0]);
            this.newArry.push(this.y[0]);
            this.a = 'v';
            console.log(this.x[0], this.y[0]);
          }
        }
        this.y[0]--;
        this.newArrx.push(this.x[0]);
        this.newArry.push(this.y[0]);
        console.log(this.x[0], this.y[0]);
      }
      if (this.y[0] === this.y[1]) {
        while (this.x[0] < this.x[1]) {
          this.x[0] ++;
          this.a = '^';
          this.newArrx.push(this.x[0]);
          this.newArry.push(this.y[0]);
          console.log(this.x[0], this.y[0]);
        }
        while (this.x[0] > this.x[1]) {
          this.x[0] --;
          this.a = 'v';
          this.newArrx.push(this.x[0]);
          this.newArry.push(this.y[0]);
          console.log(this.x[0], this.y[0]);
        }

        this.x = [];
        this.y = [];
        console.log(this.newArrx, this.newArry);                    // printing the values of x and y array on the console
      }
    }
    this.cordinates = [];
    for (let i = 0; i < this.newArrx.length; i++) {
      this.cordinates.push([this.newArrx[i], this.newArry[i]]);     // pushing the immediate x and y coordinates in the cordinates array
    }
    console.log('cordinates are', this.cordinates);
  }

  check(m, n) {                                                     // on click event function for printing the desired path
    let flag = 0;
    for (let j = 0; j < this.newArrx.length; j++) {
      if (m === this.newArrx[j] && n === this.newArry[j]) {
        flag = 1;
      }
    }
    if (flag === 1) {
      return true;
    } else {
     return false;
   }
  }

  reset() {
    window.location.reload();                                   // reload the page for selecting a different direction
  }
}
