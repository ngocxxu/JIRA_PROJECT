import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../components/Home/Header/Header";
import ContentMainJira from "../components/Jira/Main/ContentMainJira";
import HeaderMainJira from "../components/Jira/Main/HeaderMainJira";
import InfoMainJira from "../components/Jira/Main/InfoMainJira";
import MenuJira from "../components/Jira/MenuJira";
import ModalJira from "../components/Jira/ModalJira/ModalJira";
import SidebarJira from "../components/Jira/SidebarJira";
import IndexJira from "../pages/Jira/ProjectDetail/IndexJira";
// import '../index.css'

export const JiraTemplate = (props) => {
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
                <div className=" button-query">
                  <i style={{fontSize:'50px'}} className="fas fa-caret-square-down"></i>
                </div>
              </div>
            </div>
          </Fragment>
        );
      }}
    />
  );
};
