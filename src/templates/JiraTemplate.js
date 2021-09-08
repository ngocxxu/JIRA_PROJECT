import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Header from "../components/Home/Header/Header";
import ContentMainJira from "../components/Jira/Main/ContentMainJira";
import HeaderMainJira from "../components/Jira/Main/HeaderMainJira";
import InfoMainJira from "../components/Jira/Main/InfoMainJira";
import MenuJira from "../components/Jira/MenuJira";
import ModalJira from "../components/Jira/ModalJira/ModalJira";
import SidebarJira from "../components/Jira/SidebarJira";
import IndexJira from "../pages/Jira/ProjectDetail/IndexJira";
import { ReactComponent as Menu } from "../assets/icon/menu.svg";


export const JiraTemplate = (props) => {

  const {toggleMenu} = useSelector(state => state.CommentReducer)
  const {toggleMenuBig} = useSelector(state => state.CommentReducer)


  const dispatch = useDispatch()
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div>
              {/* BODY */}
              <div className="jira ">
                {/* Menu */}
                <MenuJira></MenuJira>
                {/* {/* {/* Main Board * /} * /} */}
                <props.component {...propsRoute} />
                {/* Info Modal */}
                <ModalJira></ModalJira>
                <div onClick={()=>{
                  dispatch({
                    type: 'TOGGLE_MENU_BIG',
                    toggleBarBig: !toggleMenuBig,
                  })
                }} className="btn button-big-query">
                  <Menu className="svg-menu" style={{width: '40px'}}></Menu>
                </div>
                <div onClick={()=>{
                  dispatch({
                    type: 'TOGGLE_MENU',
                    toggleBar: !toggleMenu,
                  })
                }} className=" button-query">
                  <i style={{fontSize:'50px',color:'#b42547'}} className="fas fa-caret-square-down"></i>
                </div>
              </div>
            </div>
          </Fragment>
        );
      }}
    />
  );
};
