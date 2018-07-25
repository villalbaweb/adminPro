import { Component, OnInit } from '@angular/core';
import { resolve } from 'path';
import { reject } from '../../../../node_modules/@types/q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    let promise = new Promise((resolve, reject) => {
      let counter = 0;
      let interval = setInterval(()=> {
        counter += 1;
        console.log(counter);
        if(counter === 3) {
          reject('The counter has been 3');
          clearInterval(interval);
        }
      }, 1000);
    });

    promise.then((success) => {
      console.log('Success response... ', success);
    })
    .catch((error) => {
      console.error('Error message... ', error);
    })
  }

  ngOnInit() {
  }

}
