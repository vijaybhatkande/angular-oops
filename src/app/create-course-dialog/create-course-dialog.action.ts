import {DataManagerService} from '../service/data-manager.service';
/**
 * Created by amrit on 3/12/2020.
 */
export abstract class CreateCourseDialogAction {
  public options = [
    {
      display: 'BA',
      value: 'ba'
    }, {
      display: 'BBA',
      value: 'bba'
    }, {
      display: 'BCA',
      value: 'bca'
    }, {
      display: 'MA',
      value: 'ma'
    }, {
      display: 'MBA',
      value: 'mba'
    }, {
      display: 'MCA',
      value: 'mca'
    }
  ];

  protected createCourseUrl: string;
  protected dataManager: DataManagerService;

  protected createCourse(postBody) {
    this.dataManager.postRequest(this.createCourseUrl, postBody)
      .subscribe(
        res => this.createCourseResponse(res),
        err => this.createCourseResponse(err)
      );
  }

  protected abstract createCourseResponse(res);

  protected abstract createCourseError(err);
}
