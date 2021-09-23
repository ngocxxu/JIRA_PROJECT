import React from "react";
import me from "../../../assets/img/me.png";
import styled from "styled-components";
import { ReactComponent as Github } from "../../../assets/icon/github.svg";
import { ReactComponent as Facebook } from "../../../assets/icon/facebook.svg";
import { ReactComponent as Instagram } from "../../../assets/icon/instagram.svg";

const CvImage = styled.div`
  border-radius: 50%;
`;
const ImageMe = styled.img`
  border-radius: 50%;
  border: 12px solid #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

export default function Aboutme(props) {
  return (
    <div className="container mt-2 mb-2 p-5 rounded bg-glass animate__animated animate__rotateInUpLeft">
      <div className="cv-header row">
        <div className="col-sm-12 col-md-4">
          <CvImage className="cv-img" style={{ width: "100%" }}>
            <ImageMe className="mw-100 h-auto" src={me}></ImageMe>
          </CvImage>
        </div>
        <div className="col-sm-12 col-md-8 d-flex flex-column justify-content-center">
          <h3>Frontend Developer</h3>
          <h1 className="typing-name">Hi, i'm Ngoc Quach</h1>
          <p style={{ fontSize: "15px" }}>
            Previously I used to be a chemical engineering but due to both
            logical and creative passion for IT since I studied in middle
            school, I decided to go back to it. I have known the frontend and
            feel interested in it because I want to bring the best-completed
            products for customers and satisfy all the requirements from them.
          </p>
          <div className="mb-4">
            <a href="https://github.com/ngocxxu">
              <Github className="mr-4 svg-icon" style={{ width: "35px" }}></Github>
            </a>
            <a href="https://www.facebook.com/ngocquach97/">
              <Facebook
                className="mr-4 svg-icon"
                style={{ fill: "#475993", width: "35px" }}
              ></Facebook>
            </a>
            <a href="https://www.instagram.com/vong_paracord/">
              <Instagram className="mr-4 svg-icon" style={{ width: "35px" }}></Instagram>
            </a>
          </div>
        </div>
      </div>
      <div className="cv-body">
        <div className="cv-edu-exp mt-md-3 mt-sm-2">
          <div className="cv-edu">
            <div className="row">
              <div className="">
                <div className="card" style={{ backgroundColor: "#f8f8f8" }}>
                  <div className="card-body">
                    <div id="content" className="row">
                      <div className="col-md-6">
                        <h5 className="border-text">Work Experiences</h5>
                        <ul className="timeline">
                          <li className="event">
                            <h3>Jun 2021 - Aug 2021</h3>
                            <div>Workplace: Kyanon Digital</div>
                            <div>Position: Intern Frontend Developer</div>
                            <div>Description:</div>
                            <div>
                              - Building UI for the landing page of the website
                              on the client-side and server-side.
                              <br />- Join in realistic projects and daily
                              meetings with team and customer.
                              <br />- Be learned and used such as pug, jquery,
                              git, basic reactJS...
                            </div>
                          </li>
                          <li className="event">
                            <h3>Aug 2015 - Sep 2019</h3>
                            <div>Workplace: HOYA LENS VIETNAM LTD.</div>
                            <div>Position: Chemical Engineering.</div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h5 className="border-text">Education</h5>
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
