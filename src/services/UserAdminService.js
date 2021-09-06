import { BaseService } from "./BaseService";
import Axios from "axios";
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";
//ProjectService kế thừa BaseService thông qua extends
export class UserAdminService extends BaseService {
  constructor() {
    super();
  }

  userSignUpAPI = (signUpForm) => {
    return this.post(`Users/signup`, signUpForm);
  };
  getUserAdminAPI = () => {
    return this.get(`Users/getUser`);
  };
  deleteUserAdminAPI = (userId) => {
    return this.delete(`Users/deleteUser?id=${userId}`);
  };
  // updateUserAdminAPI = (updateUser) => {
  //   return this.put(`Users/editUser`,updateUser);
  // };
}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const userAdminService = new UserAdminService();
