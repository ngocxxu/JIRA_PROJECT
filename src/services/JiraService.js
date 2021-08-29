import { DOMAIN, DOMAIN_JIRA } from "../util/constants/settingSystem";
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
  }
};


