import { BaseService } from "./BaseService";


//ProjectService kế thừa BaseService thông qua extends
export class StatusService extends BaseService {

  constructor(){
    super();
  }

  getAllStatus = () => {
    return this.get(`Status/getAll`);
  }
}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const statusService = new StatusService();