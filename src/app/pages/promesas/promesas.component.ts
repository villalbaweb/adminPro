import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.ContarHastaTres().then((success) => {
      console.log('Success response... ', success);
    })
    .catch((error) => {
      console.error('Error message... ', error);
    })
  }

  ngOnInit() {
  }

  ContarHastaTres(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let counter = 0;
      let interval = setInterval(()=> {
        counter += 1;
        console.log(counter);
        if(counter === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
