import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { visitSiblingRenderNodes } from '@angular/core/src/view/util';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  $observableSubscription: Subscription = new Subscription();

  constructor() { 
    this.$observableSubscription = this.regresarObservable()
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

  ngOnDestroy() {
    this.$observableSubscription.unsubscribe();
  }

  regresarObservable():Observable<number>{
    return new Observable<{value:number}>( observer => {
      let counter = 0;
      let intervalo = setInterval(() => {
        counter++;

        let result = {
          value: counter
        };

        observer.next(result);
        // if(counter === 3) {
        //   observer.complete();
        //   clearInterval(intervalo);
        // } 
        // else if(counter === 2) {
        //   clearInterval(intervalo);
        //   observer.error('El contador alcanzo 2...');
        // }
      }, 1000);
    })
    .pipe(
      retry(2),
      map(valor => valor.value),
      filter(valor => valor % 2 === 1)
    );
  }

}
