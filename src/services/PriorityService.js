import { BaseService } from "./BaseService";


//ProjectService kế thừa BaseService thông qua extends
export class PriorityService extends BaseService {

  constructor(){
    super();
  }

  getAllPriority = () => {
    return this.get(`Priority/getAll`);
  }
}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const priorityService = new PriorityService();