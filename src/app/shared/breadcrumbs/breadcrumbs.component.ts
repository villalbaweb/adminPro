import { Component, OnInit } from '@angular/core';
import { Router, ActivationStart, ActivationEnd } from '@angular/router';
import { retry, map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  currentPage: string = 'Initial';

  constructor(private router:Router,
              private title: Title,
              private metaData: Meta) {
    this.getRouteData()
    .subscribe((data) => {
      console.log(data);
      this.currentPage = data.Titulo;
      this.title.setTitle(data.Titulo);
      const descriptionMetaTag: MetaDefinition = {
        name: 'description',
        content: `This is a test of a meta tag data included to an Angular App, page: ${data.Titulo}`
      };
      this.metaData.updateTag(descriptionMetaTag);
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
