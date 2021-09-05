import React,{useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {ProjectReducer} from '../../../redux/reducers/ProjectReducer'
import ContentMainJira from "../../../components/Jira/Main/ContentMainJira";
import HeaderMainJira from "../../../components/Jira/Main/HeaderMainJira";
import InfoMainJira from "../../../components/Jira/Main/InfoMainJira";

export default function IndexJira(props) {

  //lấy mảng projectDetail từ redux
  const {projectDetail} = useSelector(state => state.ProjectReducer)
  // console.log('projectDetailIndex',projectDetail)

  const dispatch = useDispatch();

  // console.log('param projectId',props.match.params.projectId) //từ đây ta gửi con số param lên server gọi api

  //gọi api khi ng dùng link qua trang này và component sẽ dc render lại
  //hoặc ng dùng tự gõ url thì ta sẽ lấy tham số từ url => gọi saga
  useEffect(() => {
    //lấy ra tham số projectId từ param url
    const {projectId} = props.match.params; 

    dispatch({
      type: 'GET_PROJECT_DETAIL_SAGA',
      projectId,
    })
    
  },[])

  return (
    <div className="main">
      <HeaderMainJira projectDetail={projectDetail} ></HeaderMainJira>
      {/* ở đây ta truyền props cho component InfoMainJira */}
      <InfoMainJira projectDetail={projectDetail}></InfoMainJira>
      <ContentMainJira projectDetail={projectDetail}></ContentMainJira>
    </div>
  );
}
