/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import minidemo1 from "../../../assets/img/demomini1.png";
import minidemo2 from "../../../assets/img/demomini2.png";
import minidemo3 from "../../../assets/img/demomini3.png";
import minidemo4 from "../../../assets/img/minidemo4.png";
import minidemo5 from "../../../assets/img/minidemo5.png";
import minidemo6 from "../../../assets/img/minidemo6.png";

export default function Miniproject(props) {
  return (
    <div className="container d-md-flex flex-wrap justify-content-center align-items-center animate__animated animate__fadeInDown">
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={minidemo1} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">To Do List</h5>
            <p className="card-text">
              Sometimes you have to plan for your project and arrage it how to
              much suitable.
            </p>
            <div className="d-flex justify-content-around">
              <a
                href="https://github.com/ngocxxu/ReactJS-Excersice"
                className="btn btn-card"
              >
                Github
              </a>
              <a
                href="https://todolist-bono.netlify.app"
                className="btn btn-card-1"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={minidemo2} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Chinese Dice</h5>
            <p className="card-text">
              Dice games are games that use or incorporate one or more dice as
              their sole or central component.
            </p>
            <div className="d-flex justify-content-around">
              <a
                href="https://github.com/ngocxxu/BC08E-TaiXiu-Bono"
                className="btn btn-card"
              >
                Github
              </a>
              <a
                href="https://taixiucovid.netlify.app"
                className="btn btn-card-1"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img
            className="card-img-top mw-100"
            src={minidemo3}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Rock, Paper, Scissors</h5>
            <p className="card-text">
              Between two people which each player randomly forms one of three
              shapes from their hand.
            </p>
            <div className="d-flex justify-content-around">
              <a
                href="https://github.com/ngocxxu/BC08E-OanTuTi-BaoNgoc"
                className="btn btn-card"
              >
                Github
              </a>
              <a
                href="https://oantuticovid.netlify.app"
                className="btn btn-card-1"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={minidemo4} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Industry</h5>
            <p className="card-text">
              It's a center of economy, including manufacturing and production
              of other intermediate or final goods
            </p>
            <div className="d-flex justify-content-around">
              <a
                href="https://github.com/ngocxxu/Industry-PJ"
                className="btn btn-card"
              >
                Github
              </a>
              <a
                href="http://industry-world.surge.sh/"
                className="btn btn-card-1"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img className="card-img-top" src={minidemo5} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">Farming</h5>
            <p className="card-text">
              It's devoted primarily to agricultural processes with producing
              food and other crops
            </p>
            <div className="d-flex justify-content-around">
              <a
                href="https://github.com/ngocxxu/Farm-Web"
                className="btn btn-card"
              >
                Github
              </a>
              <a
                href="https://farm-bono.netlify.app"
                className="btn btn-card-1"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="miniproject_right  m-md-4">
        <div className="card bg-glass">
          <img
            className="card-img-top mw-100"
            src={minidemo6}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">Corporation</h5>
            <p className="card-text">
              A corporation is a group of people or a
              company—authorized by the state.
            </p>
            <div className="d-flex justify-content-around">
              <a
                href="https://github.com/ngocxxu/project-Corp-Web"
                className="btn btn-card"
              >
                Github
              </a>
              <a
                href="https://corp-bono.netlify.app/"
                className="btn btn-card-1"
              >
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
