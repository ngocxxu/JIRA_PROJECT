import React from "react";
import avatar1 from "../../../assets/img/ava1.jfif";
import avatar2 from "../../../assets/img/ava2.jfif";
import avatar3 from "../../../assets/img/ava3.jfif";
import ReactHtmlParser from "react-html-parser";

export default function InfoMainJira({ projectDetail, ...props }) {
  const renderAvatar = () => {
    return projectDetail.members?.map((mem, index) => {
      return (
        <div key={index} className="avatar">
          <img src={mem.avatar} alt={mem.avatar} />
        </div>
      );
    });
  };

  return (
    <>
      <div className="container mt-4 mb-4">
        <div className="row text-center" style={{justifyContent: 'space-evenly'}}>
          <div className="col-md-5 m-3 bg-glass p-md-2">
            <h5 style={{color: 'rgb(25 39 155 / 85%)'}}>Name Project</h5>
            <p className="">{projectDetail.projectName}</p>
          </div>
          <div className="col-md-5 m-3 bg-glass p-md-2">
            <h5 style={{color: 'rgb(25 39 155 / 85%)'}}>Detail Description</h5>
            <div>
              {/* ReactHtmlParser dùng để parse ra các dữ liệu từ description khi ta sử
        dụng các công cụ của editor (tô màu chữ, chữ to, canh lề...) nó vẫn sẽ
        giữ nguyên ko bị mất format từ edit */}
              {ReactHtmlParser(projectDetail.description)}
            </div>
          </div>
        </div>
      </div>
      <div className="info d-lg-flex justify-content-center align-content-center" >
        <div className="search-block">
          <input className="search ml-3" />
          <i className="fa fa-search ml-2" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
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
