import {DataManagerService} from '../service/data-manager.service';
/**
 * Created by amrit on 3/11/2020.
 */
export abstract class DashboardComponentAction {
  protected dataManager: DataManagerService;
  protected getCourseListUrl: string;


  protected getCourseList(postBody) {
    this.dataManager.postRequest(this.getCourseListUrl, postBody)
      .subscribe(
        res => this.getCourseListResponse(res),
        err => this.getCourseListError(err)
      );
  }

  protected abstract getCourseListResponse(res);

  protected abstract getCourseListError(err);
}
