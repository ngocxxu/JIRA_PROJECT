import React from "react";
import styled from "styled-components";


const CoverItems2 = styled.div`
  padding: 10px;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  transition: all 0.5s ease;
  margin: 25px 0;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    transition: all 0.5s ease-in-out;
  }
`;


const ItemSkill1 = styled.div`
  border-radius: 0.8rem;
  padding: 10px;
  background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);  color: #fff;
  margin: 5px 5px;
`;

export default function Coordination(props) {
  return (
    <div className="container mt-3 mb-sm-2 mt-md-5 mb-md-5  p-md-5 ">
      <div>
        <div className="skill bg-glass p-5">
          <h2 className="text-center">Coordination</h2>
          <h6 className="text-center" >To build this project, I used and be supported as table below. Thank you very much for their collaboration.</h6>
          <CoverItems2 className="skill-line1 flex-wrap d-flex align-items-center bg-glass">
            <ItemSkill1>HTML5</ItemSkill1>
            <ItemSkill1>CSS3</ItemSkill1>
            <ItemSkill1>Bootstrap</ItemSkill1>
            <ItemSkill1>Hooks</ItemSkill1>
            <ItemSkill1>Redux Saga</ItemSkill1>
            <ItemSkill1>Styled Component</ItemSkill1>
            <ItemSkill1>History</ItemSkill1>
            <ItemSkill1>Formik</ItemSkill1>
            <ItemSkill1>Yup</ItemSkill1>
            <ItemSkill1>Ant Design</ItemSkill1>
            <ItemSkill1>Material UI</ItemSkill1>
            <ItemSkill1>Axios</ItemSkill1>
            <ItemSkill1>Lodash</ItemSkill1>
            <ItemSkill1>Router</ItemSkill1>
            <ItemSkill1>AnimateCSS</ItemSkill1>
            <ItemSkill1>ReactHtmlParser</ItemSkill1>
            <ItemSkill1>React DnD</ItemSkill1>
            <ItemSkill1>CSS Gradient</ItemSkill1>
            <ItemSkill1>Cybersoft Academy</ItemSkill1>
            <ItemSkill1>Server Cybersoft</ItemSkill1>
          </CoverItems2>
        </div>
      </div>
    </div>
  );
}
