import React from "react";
import styled from "styled-components";

const CoverItems = styled.div`
padding: 10px;
border-radius: 5rem;
box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
transition: all 0.5s ease;
margin: 25px 0;

&:hover{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  transition: all 0.5s ease-in-out;
}

@media (max-width: 768px) {
  flex-wrap: wrap; 
  border-radius: 5px;
}

`



const ItemSkill = styled.div`
  border-radius: 0.8rem;
  padding: 10px;
  background-image: linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%);
  color: #fff;
  margin: 0 5px;

  
`;



export default function MySkill(props) {
  return (
    <div className="container mt-sm-2 mb-sm-2 mt-md-5 mb-md-5 rounded p-5 bg-glass animate__animated animate__fadeInUp">
      <div>
        <div className="skill">
          <h2 className="text-center">My Skills</h2>
          <CoverItems className="skill-line1 d-flex align-items-center bg-glass animate__animated animate__fadeInDown animate__delay-1s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">HTML/CSS</h5>
          <ItemSkill>HTML5</ItemSkill>
          <ItemSkill>CSS3</ItemSkill>
          <ItemSkill>SASS/SCSS</ItemSkill>
          <ItemSkill>Bootstrap</ItemSkill>
          <ItemSkill>Tailwindcss</ItemSkill>
          <ItemSkill>Pug</ItemSkill>
          <ItemSkill>TinyMCE</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 d-flex align-items-center bg-glass animate__animated animate__fadeInDown animate__delay-2s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">Javascript</h5>
          <ItemSkill>ES5/ES6</ItemSkill>
          <ItemSkill>JQuery</ItemSkill>
          <ItemSkill>Basic Lodash</ItemSkill>
          <ItemSkill>AJAX</ItemSkill>
          <ItemSkill>Axious</ItemSkill>
          <ItemSkill>RESTfull API</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 d-flex align-items-center bg-glass animate__animated animate__fadeInDown animate__delay-3s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">ReactJS</h5>
          <ItemSkill>Router</ItemSkill>
          <ItemSkill>Redux-thunk/saga</ItemSkill>
          <ItemSkill>Hooks</ItemSkill>
          <ItemSkill>Styled Component</ItemSkill>
          <ItemSkill>Basic React Spring</ItemSkill>
          <ItemSkill>Formik/Yup</ItemSkill>
          <ItemSkill>React DnD</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 d-flex align-items-center bg-glass animate__animated animate__fadeInDown animate__delay-4s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">AngularJS</h5>
          <ItemSkill>Basic AngularJS</ItemSkill>
          <ItemSkill>Basic Typescript</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 d-flex align-items-center bg-glass animate__animated animate__fadeInDown animate__delay-5s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">Others</h5>
          <ItemSkill>Basic Git</ItemSkill>
          <ItemSkill>Ant Design</ItemSkill>
          <ItemSkill>Material UI</ItemSkill>
          <ItemSkill>Storybook</ItemSkill>
          <ItemSkill>History</ItemSkill>
          <ItemSkill>AnimateCSS</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 skill6 d-flex align-items-center bg-glass animate__animated animate__fadeInDown animate__delay-1s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">Design</h5>
          <ItemSkill>Adobe Illustrator</ItemSkill>
          <ItemSkill>Basic Adobe Photoshop</ItemSkill>
          <ItemSkill>Adobe XD</ItemSkill>
          <ItemSkill>Figma</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 skill7 d-flex align-items-center bg-glass animate__animated animate__fadeInDown  animate__delay-1s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">Soft Skill</h5>
          <ItemSkill>Presentation</ItemSkill>
          <ItemSkill>Teamwork</ItemSkill>
          <ItemSkill>Learning skills</ItemSkill>
          <ItemSkill>Self-motivation</ItemSkill>
          <ItemSkill>Creativity</ItemSkill>
          </CoverItems>
          <CoverItems className="skill-line1 skill8 d-flex align-items-center bg-glass animate__animated animate__fadeInDown  animate__delay-1s">
          <i class="fas fa-star"></i>
          <h5 className="m-0 pl-2 pr-2">Language</h5>
          <ItemSkill>TOEIC/670</ItemSkill>
          </CoverItems>
        </div>
      </div>
    </div>
  );
}
