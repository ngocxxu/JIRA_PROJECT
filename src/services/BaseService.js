import Axios from "axios"
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";


export class BaseService{

  //PUT json về phía backend
  put = (url, id, model) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "PUT",
      data: model, //model: là dữ liệu ta gửi lên api xử lý
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    });
  }

// sửa lại chỗ này thêm tham số thứ 2 dô data vào.
  post = (url,model) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      data:model,
      method: "POST",
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  }

  
  get = (url, id, model) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "GET",
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  }


  delete = (url, id, model) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "DELETE",
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  }


}