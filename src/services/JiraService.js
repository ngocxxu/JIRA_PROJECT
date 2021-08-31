import { DOMAIN, DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";
import Axios from "axios";

export const jiraService = {
  signinJira: (userLogin) => {
    return Axios({
      url: `${DOMAIN_JIRA}/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_JIRA}/ProjectCategory`,
      method: "GET",
    })
  },
  createProject:(newProject)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/createProject`,
      method: "POST",
      data: newProject,
    })
  },
  createProjectAuthorization: (newProject)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },
  getListProject:()=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/getAllProject`,
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },
  updateProject:(projectUpdate)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: 'PUT',
      data: projectUpdate, //gửi data len server api xử lý
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },
  
};


