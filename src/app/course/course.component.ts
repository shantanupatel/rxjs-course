import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course$: Observable<Course[]>;
  lessons$: Observable<Lesson[]>;
  courseId: string;
  courseData: Course[] = [];

  @ViewChild('searchInput', { static: true, read: ElementRef }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    console.log(this.courseId);

    // const courseEndpoint = '/api/courses/' + this.courseId;
    // const lessonsEndpoint = '/api/lessons?courseId=' + courseId + '&pageSize=100';
    // this.course$ = this.loadCourses();
    // this.course$.subscribe(res => this.courseData = res)
    // this.loadCourses().subscribe(res => this.courseData = res);
    // this.lessons$ = this.loadLessons();

    // this.course$ = createHttpObservable(`/api/courses/${courseId}`)

    //
  }

  ngAfterViewInit() {
    const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
      map(evt => evt.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(search => this.loadLessons(search))
    // ).subscribe(event => this.lessons$ = event);
    )

    const initialLessons$ = this.loadLessons();

    // this.course$ = this.loadCourses();

    this.lessons$ = concat(initialLessons$, searchLessons$);
  }

  loadLessons(search: string = '') {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`).pipe(
      map(res => res['payload'])
    );
  }

  /* loadCourses() {
    return createHttpObservable(`/api/courses/${this.courseId}`);
  } */

}
