import { BaseService } from "./BaseService";
import Axios from "axios";
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";
//ProjectService kế thừa BaseService thông qua extends
export class UserService extends BaseService {
  constructor() {
    super();
  }

  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`,userProject);

  };

  removeUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`,userProject);

  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
  }

}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const userService = new UserService();
