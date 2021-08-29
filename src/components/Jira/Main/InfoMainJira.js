import React from "react";
import avatar1 from "../../../assets/img/ava1.jfif";
import avatar2 from "../../../assets/img/ava2.jfif";
import avatar3 from "../../../assets/img/ava3.jfif";

export default function InfoMainJira(props) {
  return (
    <>
      <h3>Cyber Board</h3>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          <div className="avatar">
            <img src={avatar1} alt />
          </div>
          <div className="avatar">
            <img src={avatar2} alt />
          </div>
          <div className="avatar">
            <img src={avatar3} alt />
          </div>
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
