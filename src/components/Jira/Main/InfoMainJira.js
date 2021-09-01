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
      <h2>{projectDetail.projectName}</h2>
      <h5>Detail Description</h5>
      <section>
        {/* ReactHtmlParser dùng để parse ra các dữ liệu từ description khi ta sử
        dụng các công cụ của editor (tô màu chữ, chữ to, canh lề...) nó vẫn sẽ
        giữ nguyên ko bị mất format từ edit */}
        {ReactHtmlParser(projectDetail.description)}
      </section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
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
