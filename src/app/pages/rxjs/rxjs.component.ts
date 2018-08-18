import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { 

    let obs = new Observable( observer => {
      let counter = 0;
      let intervalo = setInterval(() => {
        counter++;
        observer.next(counter);
        if(counter === 3) {
          observer.complete();
          clearInterval(intervalo);
        } else if(counter === 2) {
          clearInterval(intervalo);
          observer.error('El contador alcanzo 2...');
        }
      }, 1000);
    });

    obs
    .pipe(
      retry(2)
    )
    .subscribe(
      (numero) => {
        console.log(numero);
      },
      (error) => {console.log(error);},
      () => { console.log('El observer completed...');
    });
  }

  ngOnInit() {
  }

}
