import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {CreateCourseDialogAction} from './create-course-dialog.action';
import {DataManagerService} from '../service/data-manager.service';
import {CourseOptionModel, CreateCourseModel} from '../models/create-course.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/internal/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {AppConstant} from "../constant/AppConstant";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-course-dialog',
  templateUrl: './create-course-dialog.component.html',
  styleUrls: ['./create-course-dialog.component.css']
})
export class CreateCourseDialogComponent extends CreateCourseDialogAction implements OnInit {
  @ViewChild('courseInput') courseInput: ElementRef<HTMLInputElement>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  courseCtrl = new FormControl();
  filteredCourse: Observable<CourseOptionModel[]>;
  courses: CourseOptionModel[];
  newCourse: CreateCourseModel;

  constructor(dataManager: DataManagerService, public dialogRef: MatDialogRef<CreateCourseDialogComponent>,) {
    super();
    this.dataManager = dataManager;
    this.filteredCourse = this.courseCtrl.valueChanges.pipe(
      startWith(null),
      map((course: string | null) => course ? this._filter(course) : this.options.slice()));
  }

  ngOnInit(): void {
    this.courses = [];
    this.newCourse = new CreateCourseModel();
    this.createCourseUrl = AppConstant.BASEURL + AppConstant.COURSE + AppConstant.CREATE;
  }

  onAddClick() {
    this.newCourse.tags = [];
    this.courses.forEach((obj) => this.newCourse.tags.push(obj.value));
    this.createCourse(this.newCourse);
  }

  add(event: MatChipInputEvent): void {
    this.courseCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.viewValue, event.option.value);
    this.courses.push(event.option.value);
    this.courseInput.nativeElement.value = '';
    this.courseCtrl.setValue(null);
    console.log(this.courses);
  }

  remove(course: CourseOptionModel): void {
    const index = this.courses.findIndex(x => x.value === course.value);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
    console.log(course);

  }

  private _filter(value: string): CourseOptionModel[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.options.filter(course => course.display.toLowerCase().indexOf(filterValue) === 0);
  }


  protected createCourseResponse(res) {
    this.newCourse = new CreateCourseModel();
    this.courses = [];
    this.dialogRef.close(true);
  }

  protected createCourseError(err) {
  }

}
