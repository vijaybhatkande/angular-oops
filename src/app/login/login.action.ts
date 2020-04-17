import {DataManagerService} from '../service/data-manager.service';
export abstract class LoginAction {

  protected dataManager: DataManagerService;
  protected loginUrl: string;

  protected loginCall(postBody) {
    this.dataManager.postRequest(this.loginUrl, postBody)
      .subscribe(
        res => this.loginCallResponse(res),
        err => this.loginCallError(err)
      );
  }


  protected abstract loginCallResponse(res);

  protected abstract loginCallError(err);

}
