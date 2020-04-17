import {Component, OnInit, ViewChild} from '@angular/core';
import {DataManagerService} from '../service/data-manager.service';
import {DashboardComponentAction} from './dashboard.component.action';
import {AppConstant} from '../constant/AppConstant';
import {CourseModel} from '../models/course.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateCourseDialogComponent} from "../create-course-dialog/create-course-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends DashboardComponentAction implements OnInit {
  displayedColumns: string[] = ['courseName', 'tags', 'description', 'coursePrice'];
  dataList: CourseModel[];
  searchStr: string;
  dataSource: MatTableDataSource<CourseModel>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(dataManager: DataManagerService, private dialog: MatDialog) {
    super();
    this.dataManager = dataManager;
  }

  ngOnInit(): void {
    this.getCourseListUrl = AppConstant.BASEURL + AppConstant.COURSE + AppConstant.GETALL;
    this.dataList = [];
    this.getCourseList({});
  }

  protected getCourseListResponse(res) {
    this.dataList = res.data;
    this.dataSource = new MatTableDataSource(this.dataList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.dataList);
  }

  applyFilter() {
    this.dataSource.filter = this.searchStr.trim().toLowerCase();
    console.log('applyFilter', this.searchStr);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addCourseDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(CreateCourseDialogComponent, dialogConfig);
  }


  protected getCourseListError(err) {
  }

}
