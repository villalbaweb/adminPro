import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grafico-dona',
  templateUrl: './graficoDOna.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  // Doughnut
  @Input() chartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() chartData:number[] = [350, 450, 100];
  @Input() chartType:string = 'doughnut';
  @Input() chartLegend:string = 'Leyenda';
 
  ngOnInit() {
    
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}