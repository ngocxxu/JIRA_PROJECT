import { USER_SIGNIN_API } from "../../constants/Jira/JiraConst";

export const signinJiraAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
