import { Component, ElementRef, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { concat, interval, merge, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
    /* document.addEventListener('click', (event)=>
      console.log(event)
    )

    let counter = 0;

    setInterval(() => console.log(counter++), 1000); */

    // const source1$ = of(1, 2, 3);
    // const source1$ = interval(1000).pipe(take(10));
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // const result$ = concat(source1$, source2$, source3$);

    // result$.subscribe(values => console.log(values));

    // const interval1$ = interval(1000).pipe(take(5));
    // const interval2$ = interval1$.pipe(
    //   map(val => val * 10)
    // );
    // const result$ = merge(interval1$, interval2$);

    // result$.subscribe(console.log);
  }

  // testing @ViewChild decorator
  @ViewChild('pageHeading', { static: true, read: ElementRef }) pageHeading: ElementRef;

  ngAfterViewInit() {
    console.log(this.pageHeading);

    this.pageHeading.nativeElement.addEventListener('click', () => console.log('pageHeading clicked'));
  }

}
