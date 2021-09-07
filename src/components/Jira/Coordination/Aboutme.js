import React from "react";
import me from "../../../assets/img/me.png";
import styled from "styled-components";

const CvImage = styled.div`
  border-radius: 50%;
`;
const ImageMe = styled.img`
  border-radius: 50%;
  border: 15px solid #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

export default function Aboutme(props) {
  return (
    <div className="container mt-2 mb-2 p-5 bg-white rounded">
      <div className="cv-header row">
        <div className="col-sm-12 col-md-4">
          <CvImage className="cv-img" style={{ width: "100%" }}>
            <ImageMe className="mw-100 h-auto" src={me}></ImageMe>
          </CvImage>
        </div>
        <div className="col-sm-12 col-md-8 d-flex flex-column justify-content-center">
          <h3>Frontend Developer</h3>
          <h1>Hi, i'm Ngoc Quach</h1>
          <p>
            Previously I used to be a chemical engineering but due to both
            logical and creative passion for IT since I studied in middle
            school, I decided to go back to it. I have known the frontend and
            feel interested in it because I want to bring the best completed
            products for customers and satisfy all the requirements from them.
          </p>
        </div>
      </div>
      <div className="cv-body">
        <div className="cv-edu-exp mt-md-3 mt-sm-2">
          <div className="cv-edu">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div id="content" className="row">
                      <div className="col-md-6">
                        <h5>Experience</h5>
                        <ul className="timeline">
                          <li className="event">
                            <h3>Jun 2021 - Aug 2021</h3>
                            <div>Workplace: Kyanon Digital</div>
                            <div>Position: Intern Frontend Developer</div>
                            <div>Description:</div>
                            <div>
                              - Building UI for landing page of website on client-side and server-side.
                              <br/>- Join in the realistic projects and daily meeting with team and customer.
                              <br/>- Be learned and used such as pug, jquery, git, basic reactJS...
                            </div>
                          </li>
                          <li className="event">
                            <h3>Aug 2015 - Sep 2019</h3>
                            <div>Workplace: HOYA LENS VIETNAM LTD.</div>
                            <div>Position: Quality Assurance.</div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h5>Education</h5>
                        <ul className="timeline">
                          <li className="event">
                            <h3>Apr 2021 - Studying</h3>
                            <div>Study: Cybersoft Academy</div>
                            <div>Career: Frontend Developer</div>
                          </li>
                          <li className="event">
                            <h3>Aug 2015 - Sep 2019</h3>
                            <div>Study: Ton Duc Thang University.</div>
                            <div>Major: Chemical Engineering </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cv-exp"></div>
      </div>
      <div className="cv-skill">
        <div className="cv-soft"></div>
        <div className="cv-design"></div>
        <div className="cv-code"></div>
      </div>
    </div>
  );
}
