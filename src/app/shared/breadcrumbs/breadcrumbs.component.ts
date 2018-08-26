import { Component, OnInit } from '@angular/core';
import { Router, ActivationStart, ActivationEnd } from '@angular/router';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  currentPage: string = 'Initial';

  constructor(private router:Router) {
    this.getRouteData()
    .subscribe((data) => {
      console.log(data);
      this.currentPage = data.Titulo;
    });
  }

  ngOnInit() {
  }

  getRouteData() {
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => {
        return event.snapshot.data;
      })
    );
  }
}
